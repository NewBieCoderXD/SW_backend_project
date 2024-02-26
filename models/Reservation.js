const mongoose = require("mongoose")
const validator = require("email-validator");
const {timeRegex,invalidTimeMsg} = require("../config/constants")
const Reservation = new mongoose.Schema({
    reservorId:{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    restaurantId:{
        type: mongoose.Schema.ObjectId,
        ref:"Restaurant"
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