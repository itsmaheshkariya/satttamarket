let mongoose = require('mongoose');

let KhatriSchema = mongoose.Schema({
    
    head: {
        type: String,
        required: false
    },
    tail: {
        type: String,
        required: false
    }



});


let Khatri = module.exports = mongoose.model('Khatri', KhatriSchema);