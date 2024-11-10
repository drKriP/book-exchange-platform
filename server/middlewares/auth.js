const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let accessToken = req.cookies.jwt;
    console.log("accessToken : " + req);

    if(!accessToken){
        return res.status(403).json({error: 'Unauthorized'});
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.payload = payload;
        req._id = payload._id;
        next();
    } catch(err) {
        return res.status(401).json({error: 'Unauthorized'});
    }
};

module.exports.verifyToken = verifyToken;