let mongoose = require('mongoose');

let footerSchema = mongoose.Schema({
    
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


let Footer = module.exports = mongoose.model('Footer', footerSchema);