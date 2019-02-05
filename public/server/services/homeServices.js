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
        getPosts : () => {
            return $http.get("/home/posts");
        },
        clickLike : (post,email) => {
            return $http.put("/home/like/" + email,post);
        }
    }
    
}]);