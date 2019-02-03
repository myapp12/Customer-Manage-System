const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myApp', {useNewUrlParser: true});


module.exports = mongoose;