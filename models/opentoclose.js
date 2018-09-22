let mongoose = require('mongoose');

let opentocloseSchema = mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    color:{
        type: String,
        required: false
    }

});


let Open = module.exports = mongoose.model('Open', opentocloseSchema);