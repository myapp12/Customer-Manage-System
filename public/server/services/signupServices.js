

var signup = angular.module("signup"); 

signup.factory("signupServices",["$http", ($http) => {

    return {
        getUsers : () => {
            return $http.get("/api/users");
        },
        signup : (user) => {
            return $http.post("/api/signup",user);
        }
    }
}]);