let mongoose = require('mongoose');


//articleSchema


let kalyanSchema = mongoose.Schema({
    time1: {
        type: String,
        required: false
    },

result1: {
        type: String,
        required: false
    },
    time2: {
        type: String,
        required: false
    },
    result2: {
        type: String,
        required: false
    }


});


let Kalyan = module.exports = mongoose.model('Kalyan', kalyanSchema);