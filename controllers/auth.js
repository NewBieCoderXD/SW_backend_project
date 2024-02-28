const User = require('../models/User');
const Reservation = require('../models/Reservation');
const jwt = require("jsonwebtoken");


const tokenCookieOptions = {
    maxAge: dayToMilliseconds(process.env.JWT_EXPIRING_DAYS),
    httpOnly: true
}
if(process.env.DEPLOY_MODE=="production"){
    tokenCookieOptions.secure=true;
}

//@desc   : Register User
//@route  : POST /api/v1/auth/register
//@access : Public
exports.register = async (req,res,next) => {
    try {
        const {name, email, password, role} = req.body;
        
        const user = await User.create({name, email, password, role});

        sendTokenResponse(user,200,res);
    } catch(err) {
        res.status(400).json({success: false});
        console.log(err.stack);
    }
}

//@desc   : Login user
//@route  : POST /api/v1/auth/login
//@access : Public
exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    if (!email || !password){
        return res.status(400).json({success: false, msg: 'Please provide an emall and password'});
    }

    const user = await User.findOne({email}).select("email password");
    
    if (!user){
        return res.status(400).json({success: false, msg: 'Invalid credentials'});
    }
    
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(401).json({success: false, msg: "Wrong password"});
    }
}
function responseWithToken(user,statusCode,res){
    const {email,password} = user;
    const signedJwt = jwt.sign({email,password},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRING_DAYS+"d"
    });
    res.cookie("token",signedJwt,tokenCookieOptions);
    res.status(statusCode).json({
        success: true,
        token: signedJwt
    })
}