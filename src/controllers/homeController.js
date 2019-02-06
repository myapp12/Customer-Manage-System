var Posts = require('../models/postModel.js');






module.exports = (app) => {
    app.get("/home",(req,res) => {
        res.render("home.ejs");
    });

    /**
     * Lấy danh sách các bài posts
     */
    app.get("/home/posts/:email",(req,res) => {
        Posts.find(function(err, posts){
            if (err) {
                console.log("Đã có lỗi xẩy ra ( Lấy danh sách posts, file : homeController.js )");
                throw err;
            }else {
                var tempPosts = [];
                for(var i = posts.length - 1 ; i >= 0 ; --i){ // Sắp xếp lại các bài post và một số thứ khác
                    /**
                     * set isLike
                     */
                    posts[i].isLike = false;
                    for(var j = posts[i].likes.length - 1; j >= 0 ; --j){
                        if(posts[i].likes[j].email === req.params.email){
                            //console.log("Like thanh cong");
                            posts[i].isLike = true;
                            break;
                        }
                    }
                    // End set isLike


                    tempPosts.push(posts[i]);
                }
              
                res.json(tempPosts);
            } 
        });
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
            isLike : false,
            isComment : false
        };
        //console.log(req.body.feel);

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
        Posts.findOne({_id : req.body._id},function(err,post){
            if(err){
                console.log("Ui có biến đại ca ơi ... file : homeController, url : /home/like/:email");
                throw err;
            }else{
                /**
                 * handle click Like
                 */
                // var result = false;
                // for(var i = post.likes.length - 1 ; i >= 0 ; --i){
                //     if(req.params.email === post.likes[i].email){
                //         result = true;
                //     }
                // }
                if(!req.body.isLike){
                    //console.log("Like");
                    post.likes.push({email : req.params.email});
                    post.isLike = true;
                }else{
                    post.likes.forEach(function(value,index){
                        if(req.params.email === value.email){
                            console.log(index);
                            post.likes.splice(index,1);
                            post.isLike = false;
                        }
                    });
                }
                
                // End handle click Like



                /**
                 * Lưu lại bài post =))
                 */
                post.save(function(err){
                    if(err){
                        console.log("Ui có biến đại ca ơi ... file : homeController, url : /home/like/:email");
                        throw err;
                    }else{
                        //console.log("Update thành công ...");
                        return res.send();
                    }
                });
                // End 
            }
            
        });
    });



    /**
     * btn comment
     */
    app.put("/home/comment", function(req,res){
        Posts.findOne({_id : req.body._id},function(err,post){
            if(err){
                console.log("Ui có biến đại ca ơi ... file : homeController, url : /home/like/:email");
                throw err;
            }else{
                /**
                 * Lưu lại bài post =))
                 */
                post.comments = req.body.comments;
                post.isComment = req.body.isComment;
                post.save(function(err){
                    if(err){
                        console.log("Ui có biến đại ca ơi ... file : homeController, url : /home/comment/");
                        throw err;
                    }else{
                        console.log("Comment thành công ...");
                        return res.send();
                    }
                });
                // End 
            }
            
        });
    });


}