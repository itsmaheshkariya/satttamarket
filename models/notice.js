let mongoose = require('mongoose');

let noticeSchema = mongoose.Schema({
    
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
    }



});


let Notice = module.exports = mongoose.model('Notice', noticeSchema);