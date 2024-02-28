const express = require("express");
const {register} = require("../controllers/auth")
const router = express.Router();

router.post("/register",register)
router.post("/login",register)

module.exports=router;