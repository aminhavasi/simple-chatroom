const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('./../config.json');
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
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                },
                access: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    { timestamps: true }
);

userSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.genToken = function() {
    let user = this;
    let access = 'user';
    let token = jwt
        .sign(
            {
                _id: user._id.toHexString(),
                access
            },
            config.sec_key
        )
        .toString();
    user.tokens.push({
        access,
        token
    });
    return user.save().then(() => {
        return token;
    });
};

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
