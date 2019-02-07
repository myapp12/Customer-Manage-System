var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName : String,
    email : String,
    password : String,
    image : { data: Buffer, contentType: String }
});

var Users = mongoose.model("Users", userSchema);

module.exports = Users;