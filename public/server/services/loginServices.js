

var login = angular.module("login"); // ng-app = "login"


login.factory("loginServices",["$http", ($http) => { // Tạo sevices gọi API

    return {
        getUsers : () => {
            return $http.get("/api/users");
        },
        login : (passwords) => {
            return $http.post("/api/login", passwords);
        },
        signup : (user) => {
            return $http.post("/api/signup",user);
        }
    }
}]);