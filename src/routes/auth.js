const express = require('express');
const { User, validate } = require('./../models/user');
const joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { error } = await validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('this user has been already');
        const newUser = await new User(req.body);
        await newUser.save();
        res.status(200).send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post('/login', async (req, res) => {
    const { error } = await loginValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('email or password is wrong');

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send('email or password is wrong');
    await user.genToken();
});

const loginValidator = user => {
    const schema = joi.object({
        email: joi
            .string()
            .email()
            .required(),
        password: joi
            .string()
            .min(8)
            .max(1024)
            .required()
    });
    return schema.validate(user);
};
module.exports = router;
