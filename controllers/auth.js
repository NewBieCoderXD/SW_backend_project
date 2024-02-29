const User = require('../models/User');
const Reservation = require('../models/Reservation');
const jwt = require("jsonwebtoken");
const {dayToMilliseconds} = require("../utils/time")

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
        const {username, email, password, role} = req.body;
        
        const user = await User.create({username, email, password, role});

        responseWithToken(user,200,res);
    } catch(err) {
        res.status(400).json({success: false});
        console.log(err.stack);
    }
}

//@desc   : Login user
//@route  : POST /api/v1/auth/login
//@access : Public
exports.login = async (req,res,next)=>{
    const {username, email,password} = req.body;
    if ((!username && !email) || !password){
        return res.status(400).json({success: false, msg: 'Please provide an emall and password'});
    }
    let filterQuery = {};
    if(username){
        filterQuery.username=username;
    }
    if(email){
        filterQuery.email=email;
    }

    const user = await User.findOne(filterQuery).select("email password");
    
    if (!user){
        return res.status(400).json({success: false, msg: 'Invalid credentials'});
    }
    
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(401).json({success: false, msg: "Wrong password"});
    }
    responseWithToken(user,200,res)
}
//@desc   : get user data
//@route  : GET /api/v1/auth/me
//@access : Private
exports.getMe = async function(req,res,next){
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: "Token is invalid"
        })
    }
    return res.status(200).json(req.user);
}
function responseWithToken(user,statusCode,res){
    console.log(process.env.JWT_SECRET)
    const {_id,email,password} = user;
    const signedJwt = jwt.sign({
        id:_id,
        email,
        password
    },process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRING_DAYS+"d"
    });
    res.cookie("token",signedJwt,tokenCookieOptions);
    res.status(statusCode).json({
        success: true,
        token: signedJwt
    })
}