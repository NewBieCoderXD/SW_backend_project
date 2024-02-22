const mongoose = require("mongoose")
const Restaurant = new mongoose.schema({
    name:{
        type: String,
        unique: true
    },
    address:{
        type: String,
        unique: true
    },
    menu:{

    },
    openTime:{
        type: Date
    }
})