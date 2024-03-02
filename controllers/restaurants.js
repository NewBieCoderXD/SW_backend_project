const Restaurant = require('../models/Restaurant');

//@desc   : Get all restaurants
//@route  : GET /api/v1/restaurant
//@access : Public
exports.getRestaurants = async (req,res,next) => {
    let query;
    const reqQuery = {...req.query};
    const removeFields = ['select','sort','page','limit'];
    removeFields.forEach(params => delete reqQuery[params]);
    console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Restaurant.find(JSON.parse(queryStr)).populate('reservations');

    if (req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    if (req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 25;
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;

    try {
        const total = await Restaurant.countDocuments();
        query = query.skip(startIndex).limit(limit);
        
        const res = await query;

        const pagination = {};

        if (endIndex < total){
            pagination.next = {page: page+1, limit}
        }

        if (startIndex > 0){
            pagination.prev = {page: page-1, limit}
        }

        res.status(200).json({success: true, count: res.length, data: res});
    } catch(err) {
        res.status(400).json({success: false});
    }
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