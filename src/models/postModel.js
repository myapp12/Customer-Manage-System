var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    email : String,
    fullName : String,
    public : String,
    textContent : String,
    feel : String,
    comments : [
        {   
            email : String,
            fullName : String,
            textContent : String,
            subComments : [{
                email : String,
                fullName : String,
                textContent : String,
                pathImageUser : String,
                dateTime : Number,
                timePost : String
            }],
            likes : [{
                email : String
            }],
            isLike : Boolean,
            pathImageUser : String,
            dateTime : Number,
            timePost : String
        }
    ],
    likes : [{
        email : String
    }],
    isLike : Boolean,
    pathImageUser : String,
    dateTime : Number,
    timePost : String
});


var Posts = mongoose.model("Posts",postSchema);
module.exports = Posts;