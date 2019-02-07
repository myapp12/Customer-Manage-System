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
                     * set isLike post
                     */
                    posts[i].isLike = false;
                    for(var j = posts[i].likes.length - 1; j >= 0 ; --j){
                        if(posts[i].likes[j].email === req.params.email){
                            //console.log("Like thanh cong");
                            posts[i].isLike = true;
                            break;
                        }
                    }
                    // End set isLike post




                    /**
                     * set isLike comment
                     */
                    for (var j = posts[i].comments.length - 1 ; j >= 0 ; --j){
                        posts[i].comments[j].isLike = false;
                        for(var j = posts[i].comments[j].likes.length - 1; j >= 0 ; --j){
                            if(posts[i].likes[j].email === req.params.email){
                                //console.log("Like thanh cong");
                                posts[i].comments[j].isLike = true;
                                break;
                            }
                        }
                    }
                    // End set isLike comment









                    /**
                     * get timePost status
                     */
                    var second = parseInt((new Date().getTime() - posts[i].dateTime)/1000);
                    
                    if (second < 60)
                    {
                        posts[i].timePost = "vừa xong";
                    }
                    else if (second >= 60 && second < 3600)
                    {
                        posts[i].timePost = parseInt(second / 60) + " phút trước";
                    }
                    else if (second >= 3600 && second < 86400)
                    {
                        posts[i].timePost = parseInt(second / 3600) + " giờ trước";
                    }
                    else if (second >= 86400 && second < 2592000)
                    {
                        posts[i].timePost = parseInt(second / 86400) + " ngày trước";
                    }
                    else if (second >= 2592000 && second < 77760000)
                    {
                        posts[i].timePost = parseInt(second / 2592000) + " tháng trước";
                    }
                    else
                    {
                        posts[i].timePost = parseInt(second / 77760000) + " năm trước";
                    }

                    //console.log(second);
                    //if((date.getFullYear() - posts[i].dateTime.getFullYear() == 0))
                    // End timePost status


                    /**
                     * get timePost Comment
                     */

                    for(var j = posts[i].comments.length - 1; j >= 0 ; --j){
                        var second = parseInt((new Date().getTime() - posts[i].comments[j].dateTime)/1000);
                    
                        if (second < 60)
                        {
                            posts[i].comments[j].timePost = "vừa xong";
                        }
                        else if (second >= 60 && second < 3600)
                        {
                            posts[i].comments[j].timePost = parseInt(second / 60) + " phút trước";
                        }
                        else if (second >= 3600 && second < 86400)
                        {
                            posts[i].comments[j].timePost = parseInt(second / 3600) + " giờ trước";
                        }
                        else if (second >= 86400 && second < 2592000)
                        {
                            posts[i].comments[j].timePost = parseInt(second / 86400) + " ngày trước";
                        }
                        else if (second >= 2592000 && second < 77760000)
                        {
                            posts[i].comments[j].timePost = parseInt(second / 2592000) + " tháng trước";
                        }
                        else
                        {
                            posts[i].comments[j].timePost = parseInt(second / 77760000) + " năm trước";
                        }

                        /**
                         * get postTime subComment
                         */
                        for(var k = posts[i].comments[j].subComments.length - 1; k >= 0 ; --k){
                            var second = parseInt((new Date().getTime() - posts[i].comments[j].subComments[k].dateTime)/1000);
                            if (second < 60)
                            {
                                posts[i].comments[j].subComments[k].timePost = "vừa xong";
                            }
                            else if (second >= 60 && second < 3600)
                            {
                                posts[i].comments[j].subComments[k].timePost = parseInt(second / 60) + " phút trước";
                            }
                            else if (second >= 3600 && second < 86400)
                            {
                                posts[i].comments[j].subComments[k].timePost = parseInt(second / 3600) + " giờ trước";
                            }
                            else if (second >= 86400 && second < 2592000)
                            {
                                posts[i].comments[j].subComments[k].timePost = parseInt(second / 86400) + " ngày trước";
                            }
                            else if (second >= 2592000 && second < 77760000)
                            {
                                posts[i].comments[j].subComments[k].timePost = parseInt(second / 2592000) + " tháng trước";
                            }
                            else
                            {
                                posts[i].comments[j].subComments[k].timePost = parseInt(second / 77760000) + " năm trước";
                            }
    
                            /**
                             * get postTime subComment
                             */

                        }


                         // End postTime subComment

                    }
                     // end timepost comment

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
            email : req.body.email,
            fullName : req.body.fullName,
            public : req.body.public,
            textContent : req.body.textContent,
            feel : req.body.feel,
            isLike : false,
            isComment : false,
            pathImageUser : req.body.pathImageUser,
            dateTime : new Date().getTime()
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
                            //console.log(index);
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
     * click likeComment
     */

    app.put("/home/likeComment/:email/id/:id",(req,res) => {
        Posts.findOne({_id : req.params.id},(err,post)=>{
            //console.log(req.body.email);
            if(err){
                console.log("Ui có biến đại ca ơi ... file : homeController, url : /home/likeComment/:email/id/:id");
                throw err;
            }else{
                for(var i = 0 ; i < post.comments.length ; ++i){ // Tìm comment mà user click like
                    if(post.comments[i].email === req.body.email){  // Tìm thấy
                        //console.log("Like");
                        if(!req.body.isLike){ // like
                            //console.log("Like");
                            post.comments[i].likes.push({email : req.params.email});
                            post.comments[i].isLike = true;
                        }else{ // DisLike
                            post.comments[i].likes.forEach(function(value,index){
                                if(req.params.email === value.email){
                                    //console.log(index);
                                    post.comments[i].likes.splice(index,1);
                                    post.comments[i].isLike = false;
                                }
                            });
                        }
                        break;
                    }
                }
                
                /**
                 * Lưu lại bài post =))
                 */
                post.save(function(err){
                    if(err){
                        console.log("Ui có biến đại ca ơi ... file : homeController, url : /home/likeComment/:email/id/:id");
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