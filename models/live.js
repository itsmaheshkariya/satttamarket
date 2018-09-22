let mongoose = require('mongoose');


//articleSchema


let liveSchema = mongoose.Schema({
    unikey: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    bgcolor: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    time1: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    }



});


let Live = module.exports = mongoose.model('Live', liveSchema);