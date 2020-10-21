const router = require('express').Router();
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')

///Validation

router.post('/register', async (req, res) => {
    //validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if user already exists
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('User Already Exists')

    ///Saves the new user into data base
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (err) {
        res.status(400).send(err);
    }
});





module.exports = router;