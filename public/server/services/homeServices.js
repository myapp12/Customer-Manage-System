var home = angular.module("home"); // ng-app = "home"


home.factory("homeServices",["$http", ($http) => { // Tạo sevices gọi API

    return {
        /**
         * Lấy thông tin người đăng nhập : fullName
         */
        getUserMain : () => {
            return $http.get("/api/userMain");
        },
        postStatus : (post) => {
            return $http.post("/home/post", post);
        },
        getPosts : (email) => {
            return $http.get("/home/posts/" + email);
        },
        clickLike : (post,email) => {
            return $http.put("/home/like/" + email,post);
        },
        clickComment : (post) => {
            return $http.put("/home/comment", post);
        },
        clickLikeComment : (post,comment,email) => {
            return $http.put("/home/likeComment/" + email + "/id/" + post._id,comment);
        }
    }
    
}]);