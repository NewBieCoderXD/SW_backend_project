const express = require("express");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
dotenv.config({
    path:"./config/config.env"
})

const restaurantRoute = require("./routes/restaurant");
const authRoute = require("./routes/auth");
const { connectDB } = require("./config/connectDB");

const app = express();

connectDB();
// const {dayToMilliseconds} = require("./utils/time")
// console.log(dayToMilliseconds(process.env.JWT_EXPIRING_DAYS));

app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/restaurants",restaurantRoute);
app.use("/api/v1/auth",authRoute);
app.listen(process.env.PORT);