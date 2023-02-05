const mongoose = require('mongoose')
const ShowSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    
 
},{timestamps:true})



module.exports = mongoose.model('Show', ShowSchema)