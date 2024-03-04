const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require("multer");
const { getBucket } = require('../config/connectDB');
const Files = require('../models/Files');
const Restaurant = require('../models/Restaurant');
const storage = new GridFsStorage({ 
    url:process.env.MONGO_URI,
    file: async (req,file)=>{
        const query = await Files.findOne({
            filename: req.params.id
        })
        if(query){
            await getBucket().delete(query._id);
        }
        return {
            filename: req.params.id
        }
    }
});
// exports.upload = multer({storage });
exports.upload=function(field,mimeTypes){
    return async function(req,res,next){
        const upload = multer({
            storage,
            fileFilter: async function(req,file,callback){
                let restaurant;
                if(req.params.id){
                    restaurant = await Restaurant.findById(req.params.id);
                }
                
                if(!restaurant){
                    return callback(new Error(`Not found restaurant with id ${req.params.id}`),false);
                }
                if(!mimeTypes.includes(file.mimetype)){
                    return callback(new Error("file types not supported"),false)
                }
                callback(null,true)
            }
        }).single(field);
        upload(req,res,function(err){
            if(err){
                return res.status(400).json({
                    success:false,
                    message: err.message
                })
            }
            next()
        })
    }
}