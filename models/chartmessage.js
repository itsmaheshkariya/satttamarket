let mongoose = require('mongoose');


//articleSchema


let chartMessageSchema = mongoose.Schema({
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


let ChartMessage = module.exports = mongoose.model('ChartMessage', chartMessageSchema);