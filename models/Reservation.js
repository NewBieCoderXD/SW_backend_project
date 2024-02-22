const mongoose = require("mongoose")
const validator = require("email-validator");
const {timeRegex,invalidTimeMsg} = require("../config/constants")
const Reservation = new mongoose.Schema({
    reservor:{
        email:{
            type:String,
            required: [true,"no email provided"],
            validator: [validator.validate,"not a valid email"],
            unique: true
        }
    },
    reservationDate:{
        type: Date
    },
    reservationPeriod:{
        startTime:{
            type: String,
            match: [timeRegex,invalidTimeMsg]
        },
        endTime:{
            type: String,
            match: [timeRegex,invalidTimeMsg]
        }
    }
})
module.exports=mongoose.model("Reservation",Reservation)