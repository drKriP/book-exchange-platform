const express = require('express');
const router = express.Router();

//import controller
const {register,
    login,
    logout,
    getLodgedInUser,
} = require('../controllers/user');


//import middleware
const {userRegisterValidator, userById} = require('../middlewares/user');
const {verifyToken} = require('../middlewares/auth');

//api routes
router.post('/register',userRegisterValidator, register);
router.post('/login', login);
router.get('/logout', logout);

router.get('/user', verifyToken, userById, getLodgedInUser);

module.exports = router;