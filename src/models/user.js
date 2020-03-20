const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 256,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        }
    },
    { timestamps: true }
);
const validate = user => {
    const validator = Joi.object({
        username: Joi.string()
            .min(3)
            .required()
            .max(526),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(1024)
            .required()
    });
    return validator.validate(user);
};
const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    validate
};
