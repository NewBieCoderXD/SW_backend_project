const mongoose = require("mongoose")
const {timeRegex,invalidTimeMsg} = require("../config/constants")
const Restaurant = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        minLength: 1
    },
    address:{
        type: String,
        unique: true
    },
    menu:{
        type: [String]
    },
    openingHours:{
        type: String,
        match: [timeRegex,invalidTimeMsg]
    },
    closingHours:{
        type: String,
        match: [timeRegex,invalidTimeMsg]
    },
    availableReservationPeriod:{
        type: [{
            startTime:{
                type: String,
                match: [timeRegex,invalidTimeMsg]
            },
            endTime:{
                type: String,
                match: [timeRegex,invalidTimeMsg]
            }
        }],
        minLength:1
    },
    reservedCapacity:{
        type: Number,
        min: 1
    }
})
module.exports=mongoose.model("Restaurant",Restaurant)