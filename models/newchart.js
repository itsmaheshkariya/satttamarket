let mongoose = require('mongoose');


//articleSchema


let newchartSchema = mongoose.Schema({
    unikey: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
  
    l1: {
        type: String,
        required: false
    },
    l2: {
        type: String,
        required: false
    },
    l3: {
        type: String,
        required: false
    },
    m1: {
        type: String,
        required: false
    },
    m2: {
        type: String,
        required: false
    },
    r1: {
        type: String,
        required: false
    },
    r2: {
        type: String,
        required: false
    },
    r3: {
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


let NewChart = module.exports = mongoose.model('NewChart', newchartSchema);