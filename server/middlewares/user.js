const { check,validationResult } = require('express-validator');
const User = require('../models/user');

const userRegisterValidator = [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('email', 'Invalid email').isEmail(),

    check('password', 'Password is required').notEmpty(),
    check(
        'password',
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long')
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/
        ),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const firstError = errors.array().map(error => error.msg)[0];
            return res.status(400).json({error: firstError});
        }
        next();
    }
]
const userById = async (req, res, next) => {
        const user = await User.findById(req._id).exec();
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        req.user = user;
        next();
}

module.exports.userRegisterValidator = userRegisterValidator;
module.exports.userById = userById;
