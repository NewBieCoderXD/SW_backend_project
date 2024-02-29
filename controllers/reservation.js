const Reservation = require("../models/Reservation")

exports.getReservations = async function(req,res,next){
    try{
        const restaurantId = req.body.restaurantId || req.params.restaurantId
        let filerQuery = {
            reservorId:req.user.id
        };
        if(restaurantId){
            filerQuery.restaurantId=restaurantId
        }
        let reservations = await Reservation.find(filerQuery)
        res.status(200).json({
            success:true,
            data:reservations
        })
    }
    catch(err){
        console.log(err.stack)
        res.status(400).json({
            success:false
        })
    }
}
exports.addReservation = async function(req,res,next){
    try{
        const {restaurantId,reservationPeriod,reservationDate} = req.body;
        const reservorId = req.user.id
        let existingReservations = Reservation.find({reservorId});
        if(await Reservation.countDocuments(existingReservations)>=3 && req.user.role!="admin"){
            return res.status(400).json({
                success:false,
                message:"reservations exceeding limits"
            })
        }
        const reservation = await Reservation.create({
            restaurantId,
            reservorId,
            reservationPeriod,
            reservationDate
        })
        res.status(201).json({
            success:true,
            data:reservation
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            success:false
        })
    }
}