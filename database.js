const mongoose = require('mongoose');
// const URI = 'mongodb://maheshkareeya:mahesh619619Key@ds237610.mlab.com:37610/qcom';
const URI = 'mongodb://localhost/qcom';

mongoose.connect(URI)
    .then(db => console.log('Db is connected'));

module.exports = mongoose;