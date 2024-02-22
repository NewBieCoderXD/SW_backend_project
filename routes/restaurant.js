const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

router.get("/",async (req,res,next)=>{
    const restaurants = await Restaurant.find();
    console.log(restaurants)
    res.status(200).json({
        data: restaurants
    })
})

module.exports=router