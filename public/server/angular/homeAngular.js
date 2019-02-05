var home = angular.module("home",[]);

home.controller("homeController",["$scope","homeServices","$window",($scope,homeServices,$window)=>{
    



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
            feel : $scope.feel
        };
        homeServices.postStatus($scope.status).then((post) => {
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

    $scope.posts;
    homeServices.getPosts().then((posts) => {
        $scope.posts = posts.data;
    });


    $scope.clickLike = (post) => {
        
        console.log("hihi");
        homeServices.clickLike(post,$scope.userMain.email).then(() => {
            
        });
    }




































    /* 
    * Lấy thông tin người đăng nhập : fullName
     */
    homeServices.getUserMain().then( (userMain)=> {
        $scope.userMain.fullName = userMain.data.fullName;
        $scope.userMain.email = userMain.data.email;
    });
}]);