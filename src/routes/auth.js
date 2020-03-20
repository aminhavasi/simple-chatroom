const express = require('express');
const { User, validate } = require('./../models/user');
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
module.exports = router;
