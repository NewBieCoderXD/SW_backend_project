const Restaurant = require('../models/Restaurant');

//@desc   : Get all restaurants
//@route  : GET /api/v1/restaurant
//@access : Public
exports.getRestaurants = async (req,res,next) => {
    console.log(req.query)
    const restaurants = await Restaurant.find(req.query);
    res.status(200).json({
        success: true,
        count: restaurants.length,
        data: restaurants
    });
}

//@desc   : Get a restaurant
//@route  : GET /api/v1/restaurant/:id
//@access : Public
exports.getRestaurant = async (req,res,next) => {
    try {
        const restaurant = await Restaurtant.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({success: false, message: 'Not found'});
        }
        res.status(200).json({
            success: true,
            data: restaurant
        })
    } catch(err) {
        res.status(500).json({success: false, message: 'Not valid ID'});
    }
}

//@desc   : Create a restaurant
//@route  : POST /api/v1/restaurants
//@access : Private
exports.createRestaurant = async (req,res,next) => {
    try{
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json({success: true, data: restaurant});
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"restaurant with this name already exists"
        })
    }
}

//@desc   : Update a restaurant
//@route  : PUT /api/v1/restaurants/:id
//@access : Private
exports.updateRestaurant = async (req,res,next) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id);
        
        if(!restaurant){
            return res.status(404).json({success: false, message: `Not found restaurant with id ${req.params.id}`});
        }

        res.status(200).json({success: true, data: restaurant});
    } catch(err) {
        res.status(400).json({success: false, message: 'Not valid ID'});
    }
}

//@desc   : Delete a restaurant
//@route  : DELETE /api/v1/restaurants/:id
//@access : Private
exports.deleteRestaurant = async (req,res,next) => {
    try {
        let restaurant
        if(req.params.id){
            restaurant = await Restaurant.findById(req.params.id);
        }
        
        if(!restaurant){
            return res.status(404).json({success: false, message: `Not found restaurant with id ${req.params.id}`});
        }
        
        await restaurant.deleteOne();
        res.status(200).json({success: true, data: {}});
    } catch(err) {
        res.status(400).json({success: false, message: 'Not valid ID'});
    }
}