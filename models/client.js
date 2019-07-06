let mongoose = require('mongoose');

let clientSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }



});


let Client = module.exports = mongoose.model('Client', clientSchema);