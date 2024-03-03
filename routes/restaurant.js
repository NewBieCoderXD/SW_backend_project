const express = require("express");
const Restaurant = require("../models/Restaurant");
const {getRestaurants,getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant} = require("../controllers/restaurants");
const { checkTokenIfExists } = require("../middleware/auth");
const router = express.Router();

router.route("/")
    .get(checkTokenIfExists,getRestaurants)
    .post(createRestaurant);
router.route("/:id")
    .get(getRestaurant)
    .put(updateRestaurant)
    .delete(deleteRestaurant)
module.exports=router