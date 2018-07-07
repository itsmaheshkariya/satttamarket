let mongoose = require('mongoose');


//articleSchema


let chartSchema = mongoose.Schema({
    unikey: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    jodi: {
        type: String,
        required: false
    },
    patti: {
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


let Chart = module.exports = mongoose.model('Chart', chartSchema);