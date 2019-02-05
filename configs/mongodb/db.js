const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/Application', {useNewUrlParser: true});


module.exports = mongoose;