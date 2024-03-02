const mongoose = require("mongoose")
const {timeRegex,invalidTimeMsg} = require("../config/constants")
const PeriodSubSchema = new mongoose.Schema({
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
},{
    _id:false
})
module.exports=PeriodSubSchema;