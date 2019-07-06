let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    
    text: {
        type: String,
        required: false
    },
        img: {
        type: String,
        required: false
    },
        imgtitle: {
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


let Article = module.exports = mongoose.model('Article', articleSchema);