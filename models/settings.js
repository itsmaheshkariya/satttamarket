let mongoose = require('mongoose');


//articleSchema


let settingsSchema = mongoose.Schema({
    color: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    }



});


let Settings = module.exports = mongoose.model('Settings', settingsSchema);