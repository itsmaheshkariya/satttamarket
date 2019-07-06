let mongoose = require('mongoose');

let patteSchema = mongoose.Schema({
    
    text: {
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
    select1: {
        type: String,
        required: false
    },
    select2: {
        type: String,
        required: false
    },
    select3: {
        type: String,
        required: false
    },
    total: {
        type: String,
        required: false
    }



});


let Patte = module.exports = mongoose.model('Patte', patteSchema);