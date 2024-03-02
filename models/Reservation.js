const mongoose = require("mongoose")
const PeriodSubSchema = require("./Period")
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
        type: PeriodSubSchema,
        required:true
    }
})
module.exports=mongoose.model("Reservation",Reservation)