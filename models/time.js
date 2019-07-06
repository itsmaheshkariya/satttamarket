let mongoose = require('mongoose');


//articleSchema


let timeSchema = mongoose.Schema({
    market: {
        type: String,
        required: false
    },

open: {
        type: String,
        required: false
    },
    close: {
        type: String,
        required: false
    }


});


let Time = module.exports = mongoose.model('Time', timeSchema);