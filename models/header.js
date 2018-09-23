let mongoose = require('mongoose');

let headerSchema = mongoose.Schema({
    
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


let Header = module.exports = mongoose.model('Header', headerSchema);