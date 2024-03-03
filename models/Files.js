const mongoose = require("mongoose");

const filesSchema = new mongoose.Schema({ 
    filename: String
}, 
{ 
    collection : 'fs.files' 
});
module.exports=mongoose.model("files",filesSchema)