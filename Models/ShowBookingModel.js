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
    maxPeople : {
        type:Number,
        required:true
    },
    desc : {
        type:String,
        required:true
    },
    ShowNumber:[{
        number:Number,
        notAvailableDate:[{
            type:Date
        }]
    }]
 
},{timestamps:true})

// [
//     {number:101, notAvailableDate:[26/12/2022,27/12/2022]},
//     {number:102, notAvailableDate:[]},
//     {number:103, notAvailableDate:[]},
//     {number:104, notAvailableDate:[]},
//     {number:105, notAvailableDate:[]},
//     {number:106, notAvailableDate:[]},
//     {number:107, notAvailableDate:[]},
// ]


module.exports = mongoose.model('Show', ShowSchema)