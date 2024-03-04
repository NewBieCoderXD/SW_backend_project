const express = require("express");
const Restaurant = require("../models/Restaurant");
const {getRestaurants,getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant,uploadImage,downloadImage} = require("../controllers/restaurants");
const { checkTokenIfExists } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const router = express.Router();

router.route("/")
    .get(checkTokenIfExists,getRestaurants)
    .post(createRestaurant);
router.route("/:id")
    .get(checkTokenIfExists,getRestaurant)
    .put(updateRestaurant)
    .delete(deleteRestaurant)
router.route("/:id/image")
    .post(upload("image",["image/jpeg","image/png"]),uploadImage)
    .get(downloadImage)
module.exports=router