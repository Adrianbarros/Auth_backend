const router = require('express').Router();
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')
///Validation

router.post('/register', async (req, res) => {
    //validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if user already exists
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('User Already Exists')

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    ///Saves the new user into data base
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword,
    });
    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    //Check if the email  doest exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email or Password is not Correct')
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or Password is not Correct')

    res.send('logged in!')
});





module.exports = router;