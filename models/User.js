const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true,"no username provided"],
        match: [/^[a-zA-Z0-9]+$/,"this username isn't allowed, username must be composed of only alphabets or numbers"],
        unique: true
    },
    email:{
        type:String,
        required: [true,"no email provided"],
        validator: [validator.validate,"not a valid email"],
        unique: true
    },
    role:{
        type: String,
        enum:['user','admin'],
        default:"user"
    },
    password:{
        type: String,
        required: [true,"no password provided"],
        minLength: 7,
        select: false
    },
    joinedAt:{
        type: Date,
        default: Date.now
    },
    phone:{
        type: [String],
        minLength: [1,'no phone provided']
    }
})
UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
UserSchema.methods.matchPassword=async (inputPassword)=>{
    return await bcrypt.compare(inputPassword,this.password);
}
module.exports=mongoose.model('User',UserSchema);