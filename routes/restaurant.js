const express = require("express");
const Restaurant = require("../models/Restaurant");
const {getRestaurants,getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant} = require("../controllers/restaurants");
const router = express.Router();

router.route("/")
    .get(getRestaurants)
    .post(createRestaurant);
router.route("/:id")
    .get(getRestaurant)
    .put(updateRestaurant)
    .delete(deleteRestaurant)
module.exports=router