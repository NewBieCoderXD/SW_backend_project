const express = require("express");
const { checkToken, checkRole } = require("../middleware/auth");
const { getReservations, addReservation } = require("../controllers/reservation");
const router = express.Router();

router.route("/")
    .get(checkToken,checkRole("user","admin"),getReservations)
    .post(checkToken,addReservation)
module.exports=router