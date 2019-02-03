
var signup = angular.module("signup",[]); // create ng-app

signup.controller("signuController",["$scope","signupServices","$window", ($scope , signupServices,$window) => {
    $scope.name = ""; // Kết nối với ng-model ở file login.ejs
    $scope.email = ""; // Kết nối với ng-model ở file login.ejs
    $scope.password = ""; // Kết nối với ng-model ở file login.ejs
    $scope.rePassword = ""; // Kết nối với ng-model ở file login.ejs

    

    $scope.btnSignup = () => {
        if($scope.name !== "" && $scope.email !== "" && $scope.password !== "" && $scope.rePassword !== "" ){ // Đảm bảo rằng mọi thứ không dc trống
            if($scope.password !== $scope.rePassword){
                alert("Mật khẩu không khớp");
            }else {
                var result = false;
                signupServices.getUsers().then((users)=>{
                    /* Kiểm tra xem email đăng ký đã có ai đăng ký chưa */
                    for(var user of users.data) {
                        if(user.email === $scope.email){
                            result = true;
                            alert("Email đã tồn tại ...");
                            break;
                        }
                    }
                    if(!result){ // Nếu không email hợp lệ thì cho đăng ký
                        $scope.user = {
                            fullName : $scope.name,
                            email : $scope.email,
                            password : $scope.password
                        }
                        var user = $scope.user;
                        signupServices.signup(user).then(()=>{
                            alert("Đăng ký thành công, đăng nhập ngay ...");
                            $window.location.href = '/';
                        })
                    }
                });
                
            }
        }
    }




}]);