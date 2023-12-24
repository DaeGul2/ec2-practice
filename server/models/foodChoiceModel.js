const mongoose = require('mongoose');

const foodChocieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username cannot ba blank'],
        unique: true
    },
    remark:{
        type:String
    },
    breakfast:{
        type:String,
        required:true
    },
    launch:{
        type:String,
        required:true
    },
    dinner:{
        type:String,
        required:true
    },


},{timestamps:true});

module.exports = mongoose.model('FoodChoice', foodChocieSchema);