const express = require("express");
const dotenv = require("dotenv");
const app = express();
const restaurantRoute = require("./routes/restaurant");
const { connectDB } = require("./config/connectDB");
dotenv.config({
    path:"./config/config.env"
})

connectDB();

app.use("/api/v1/restaurants",restaurantRoute);
app.listen(9999);