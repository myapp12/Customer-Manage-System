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
                textContent : String
            }],
            likes : [{
                fullName : String,
                email : String
            }],
            isLike : Boolean
        }
    ],
    likes : [{
        email : String
    }],
    isLike : Boolean,
});


var Posts = mongoose.model("Posts",postSchema);
module.exports = Posts;