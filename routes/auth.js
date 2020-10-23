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





module.exports = router;