const express = require("express");
const { checkToken, checkRole } = require("../middleware/auth");
const { getReservations, addReservation, updateReservation } = require("../controllers/reservation");
const router = express.Router();

router.route("/")
    .get(checkToken,checkRole("user","admin"),getReservations)
    .post(checkToken,addReservation)
router.route("/:id")
    .put(checkToken,checkRole("user","admin"),updateReservation)
module.exports=router