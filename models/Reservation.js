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
        required: true,
        type: Date
    },
    reservationPeriod:{
        type: new mongoose.Schema({
            startTime:{
                type: String,
                match: [timeRegex,invalidTimeMsg],
                required: true
            },
            endTime:{
                type: String,
                match: [timeRegex,invalidTimeMsg],
                required: true
            }
        },{_id:false}),
        required:true
    }
})
module.exports=mongoose.model("Reservation",Reservation)