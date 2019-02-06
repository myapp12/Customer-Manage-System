var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    fullName : String,
    public : String,
    textContent : String,
    feel : String,
    comments : [
        {
            fullName : String,
            textContent : String,
            subComments : [{
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
    isLike : Boolean
});


var Posts = mongoose.model("Posts",postSchema);
module.exports = Posts;