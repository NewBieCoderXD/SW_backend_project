const express = require("express");
const Restaurant = require("../models/Restaurant");
const {getRestaurants,getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant,uploadImage,downloadImage} = require("../controllers/restaurants");
const { checkToken,checkRole,checkTokenIfExists } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const router = express.Router();

router.route("/")
    .get(checkTokenIfExists,getRestaurants)
    .post(checkToken, checkRole("admin"), createRestaurant);
router.route("/:id")
    .get(checkTokenIfExists,getRestaurant)
    .put(checkToken, checkRole("admin"), updateRestaurant)
    .delete(checkToken, checkRole("admin"), deleteRestaurant)
router.route("/:id/image")
    .post(checkToken, checkRole("admin"), upload("image",["image/jpeg","image/png"]),uploadImage)
    .get(downloadImage)
module.exports=router