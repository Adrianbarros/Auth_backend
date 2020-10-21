const router = require('express').Router();
const User = require('../models/User')
///Validation
const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()

});

router.post('/register', async (req, res) => {
    //validate data
    const { error } = schema.validate(req.body);
    //Returns error message if error is encountered
    if (error) return res.status(400).send(error.details[0].message)

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