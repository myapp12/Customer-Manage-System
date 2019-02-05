var Posts = require('../models/postModel.js');



module.exports = (app) => {
    app.get("/home",(req,res) => {
        res.render("home.ejs");
    });

    /**
     * Lấy danh sách các bài posts
     */
    app.get("/home/posts",(req,res) => {
        Posts.find(function(err, posts){
            if (err) {
                console.log("Đã có lỗi xẩy ra ( Lấy danh sách posts, file : homeController.js )");
                throw err;
            }else {
                res.json(posts);
            } 
        })
    });


    /**
     * Đăng status
     */
    app.post("/home/post",(req,res) => {
        var post = {
            fullName : req.body.fullName,
            public : req.body.public,
            textContent : req.body.textContent,
            feel : req.body.feel,
            isLike : false
        };
        console.log(req.body.feel);

        Posts.create(post,(err,post) => {
            if(err){
                console.log("Có lỗi rồi đại ca ơi ... file: homeController.js");
                throw err;
            }else{
                console.log("Đăng bài thành công ...");
                res.send(post);
            }
        });
    });

    /**
     * click like 
     */
    app.put("/home/like/:email", function(req,res){
        if(!req.body._id){
            console.log("Có lỗi rồi đại ca ơi! file : homeController.js, url: /home/like");
            res.status(500);
            
        }else {
            Posts.update({
                _id : req.body._id,
            },{
                //edit in here
                likes : req.body.likes.push("req.params.email"),
                isLike : !req.body.isLike,
            },function(err,post){
                if(err){
                    res.status(500);
                    throw err;
                }else {
                    console.log(post);
                }
            })
        }
    });


}