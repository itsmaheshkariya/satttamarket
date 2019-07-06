let mongoose = require('mongoose');

let weeklySchema = mongoose.Schema({
    head: {
        type: String,
        required: false
    },
    headbg:{
        type: String,
        required: false
    },
    headcolor:{
        type: String,
        required: false
    },
    text:{
        type: String,
        required: false
    },
    textcolor:{
        type: String,
        required: false
    }

});


let Weekly = module.exports = mongoose.model('Weekly', weeklySchema);