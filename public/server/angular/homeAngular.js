var home = angular.module("home",[]);



home.controller("homeController",["$scope","homeServices","$window","$http",($scope,homeServices,$window,$http)=>{
    //$scope.posts;
    /* 
    * Lấy thông tin người đăng nhập : fullName
     */
    homeServices.getUserMain().then( (userMain)=> {
        $scope.userMain.fullName = userMain.data.fullName;
        $scope.userMain.email = userMain.data.email;
        $scope.userMain.pathImage = userMain.data.pathImage;

        
        // console.log($scope.userMain.image);
        homeServices.getPosts($scope.userMain.email).then((posts) => {
            $scope.posts = posts.data;
        });
    });

    
    /**
     * ***********************************************************************************************************************
     * *********************************************************************************************************************** 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     *                                                           status
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     */
    $scope.public = "Công khai";
    $scope.textContent = "";
    $scope.feel = " chia sẻ thông tin";

    /**
     * Thông tin người đăng nhập
     */
    $scope.userMain = {
        fullName : "",
        email : ""
    };


    

    $scope.btnSendStatus = ()=>{
        $scope.status = {
            fullName : $scope.userMain.fullName,
            public : $scope.public,
            textContent : $scope.textContent,
            feel : $scope.feel,
            email : $scope.userMain.email,
            pathImageUser : $scope.userMain.pathImage
        };
        homeServices.postStatus($scope.status).then((post) => {
            homeServices.getPosts($scope.userMain.email).then((posts) => {
                $scope.posts = posts.data;
                $scope.public = "Công khai";
                $scope.textContent = "";
                $scope.feel = " chia sẻ thông tin";
            });
            alert("Bài viết đã sẵn sàng ....");
        });
    }



    /**
     * ***********************************************************************************************************************
     * *********************************************************************************************************************** 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     *                                                           Post
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     */

   
    

    /**
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     *                                                             Like                 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     */
    $scope.clickLike = (post) => {

        homeServices.clickLike(post,$scope.userMain.email).then(() => {
            homeServices.getPosts($scope.userMain.email).then((posts) => {
                $scope.posts = posts.data;
            });
        });
    }










    /** 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     *                                                             comments                 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     */
    
    /**
     * Được gọi khi người dùng click vào btn send comment
     */
    $scope.btnComment = (post) => {
        var text = $('#' + post._id).val();
        post.comments.push({
            fullName : $scope.userMain.fullName,
            textContent : text,
            email : $scope.userMain.email,
            pathImageUser : $scope.userMain.pathImage,
            dateTime : new Date().getTime(),
            isLike : false
        });

        homeServices.clickComment(post).then(()=>{
            homeServices.getPosts($scope.userMain.email).then((posts) => {
                $scope.posts = posts.data;
            });
        });
    };
    // END






    /** 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     *                                                             Subcomments                 
     * ***********************************************************************************************************************
     * ***********************************************************************************************************************
     */
    
    /**
     * Được gọi khi người dùng click số lượng subComment
     */
    $scope.displaySubcomment = (comment) => {
        if(parseInt($('#' + comment._id).attr("display"))){
            $('#' + comment._id).css("display","none");
            $('#' + comment._id).attr("display","0");
        }else {
            $('#' + comment._id).css("display","block");
            $('#' + comment._id).attr("display","1");
        }
    }




    /**
     * Được gọi khi người dùng click btn send subcomment
     */
    $scope.btnSendSubcomment = (post,comment) => {
        var text = $('#' + comment._id + 'text').val();
        for (var i = 0 ; i < post.comments.length ; ++i){
            if(post.comments[i]._id === comment._id){ //
                post.comments[i].subComments.push({
                    fullName : $scope.userMain.fullName,
                    textContent : text,
                    email : $scope.userMain.email,
                    pathImageUser : $scope.userMain.pathImage,
                    dateTime : new Date().getTime()
                });
                break;
            }
        }
        homeServices.clickComment(post).then(()=>{
            homeServices.getPosts($scope.userMain.email).then((posts) => {
                $scope.posts = posts.data;
            });
        });

    }

    /**
     * Được gọi khi người dùng nhấn vào like comment
     */

     $scope.btnLikeComment = (post,comment) => {
         //alert("Hello : " + comment.textContent);
        
         homeServices.clickLikeComment(post,comment,$scope.userMain.email).then(()=>{
            homeServices.getPosts($scope.userMain.email).then((posts) => {
                $scope.posts = posts.data;
            });
         });
     }




    
}]);