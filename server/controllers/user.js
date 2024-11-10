const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    const usernameExists = await User.findOne({
        username: req.body.username});
    const emailExists = await User.findOne({
        email: req.body.email
    });

    if(usernameExists){
        return res.status(403).json({
            error: 'Username is taken'
        });
    }
    if(emailExists){
        return res.status(403).json({
            error: 'Email is taken'
        });
    }
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
        message: 'Registration successful. Please login.'
    });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        console.log('findOne');
        const user = await User.findOne({email}).exec();
        console.log(user);
        if(!user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please register.'
            });
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password do not match'
            });
        }
        let now = new Date();
        console.log(now);
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.cookie('jwt', token, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true});
        const {username} = user;
        return res.json({
            message: 'Login successful',
            token,
            user: {username, email}
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while querying the database' });
    }
}

const logout = (req, res) => {
    res.clearCookie('jwt');
    return res.json({message: 'Logout successful'});
}

const getLodgedInUser = (req, res) => {
    const {username} = req.user;

    return res.status(200).json({
        message: 'User is still logged in',
        user: req.user
    });
}


module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
module.exports.getLodgedInUser = getLodgedInUser;