
var login = angular.module("login",[]); // create ng-app


login.controller("loginController",["$scope","loginServices","$window", ($scope , loginServices,$window) => {

    $scope.name = ""; // Kết nối với ng-model ở file login.ejs
    $scope.email = ""; // Kết nối với ng-model ở file login.ejs
    $scope.password = ""; // Kết nối với ng-model ở file login.ejs
    $scope.rePassword = ""; // Kết nối với ng-model ở file login.ejs

    $scope.loadding = false; // icon loadding

    $scope.btnFacebook = () => {
        $scope.loadding = true;
        $window.location.href = '/auth/facebook'; // điều hướng đến url
    }

    $scope.btnLogin = () => {
        $scope.loadding = true; // Loadding
        loginServices.getUsers().then((users) =>{
            var result = false;
            for(var user of users.data) {
                if(user.email === $scope.email){
                    result = true;

                    $scope.passwords = {
                        password : $scope.password,
                        rePassword : user.password
                    }
                    passwords = $scope.passwords;

                    loginServices.login(passwords).then((result) => {
                        if(result.data.result === "true"){
                            $scope.loadding = false;
                            $window.location.href = "/home" // Chuyển hướng đến home
                        }else {
                            $scope.loadding = false;
                            alert("Mật khẩu không chính xác ...");
                            // reset form
                            $scope.password = "";
                            $scope.name = "";
                        }
                    });
                    break;
                }
            }
            if(!result){
                $scope.loadding = false;
                alert("Địa chỉ email không tồn tại ...");
                // reset form
                $scope.email = ""
                $scope.password = "";
                $scope.name = "";
            }
        });
    }






    $scope.btnSignup = () => {
        $scope.loadding = true;
        if($scope.name !== "" && $scope.email !== "" && $scope.password !== "" && $scope.rePassword !== "" ){ // Đảm bảo rằng mọi thứ không dc trống
            if($scope.password !== $scope.rePassword){
                $scope.loadding = false;
                alert("Mật khẩu không khớp");
            }else {
                var result = false;
                loginServices.getUsers().then((users)=>{
                    /* Kiểm tra xem email đăng ký đã có ai đăng ký chưa */
                    for(var user of users.data) {
                        if(user.email === $scope.email){
                            $scope.loadding = false;
                            result = true;
                            alert("Email đã tồn tại ...");
                            $scope.email = ""; 
                            $scope.password = ""; 
                            $scope.rePassword = ""; 
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
                        loginServices.signup(user).then(()=>{
                            $scope.loadding = false;
                            alert("Đăng ký thành công, đăng nhập ngay ...");
                            $window.location.href = '/'; // điều hướng về trang login
                        })
                    }
                });
                
            }
        }
    }
}]);


