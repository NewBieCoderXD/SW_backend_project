const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require("multer");
const { getBucket } = require('../config/connectDB');
const Files = require('../models/Files');
const storage = new GridFsStorage({ 
    url:process.env.MONGO_URI,
    file: (req,file)=>{
        return {
            filename: req.params.id
        }
    }
});
// exports.upload = multer({storage });
exports.upload=function(field,mimeTypes){
    return async function(req,res,next){
        const query = await Files.findOne({
            filename: req.params.id
        })
        if(query){
            await getBucket().delete(query._id);
        }

        const upload = multer({storage}).single(field);
        upload(req,res,function(err){
            if(err){
                res.status(400).json({
                    success:false
                })
            }
            if(!mimeTypes.includes(req.file.mimetype)){
                return res.status(415).json({
                    success:false,
                    message:"file types not supported"
                })
            }
            next()
        })
    }
}