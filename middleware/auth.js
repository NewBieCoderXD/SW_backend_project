const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.checkToken = async (req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startswith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({success: false, message: 'Not authorize to access this route'});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    }catch(err){
        return res.status(401).json({success: false, message: 'Not authorize to access this route'});
    }
}