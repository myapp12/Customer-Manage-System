var Users = require('../models/userModel.js'); // sử dụng model(collection) users
var bcrypt = require('bcryptjs');



module.exports = (app) => {


    app.post('/api/signup',(req,res) => {
        /* Ma hoa mat khau use : npm i bcryptjs --save */
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password,salt);
        /* key thuc Ma hoa mat khau tra ve hash da dc ma hoa */
        console.log("signup");

        var user = {
            fullName : req.body.fullName,
            email : req.body.email,
            password : hash
        }

        /* Thêm một đối tượng user vào trong mongodb */
        Users.create(user,(err,user) => {
            if (err) {
                console.log("Đã có lỗi xẩy ra ( Đăng ký tài khoản mới, file : signupController.js )");
                throw err;
            }else {
                console.log('Đăng ký thành công userName: ' + req.body.email);
                res.send(user);
            }
        });
        /* end add */

    });






    /*
        Lấy toàn bộ danh sách user từ mongodb
    */
    app.get('/api/users',(req,res) => {
        Users.find(function(err, users){
            if (err) {
                console.log("Đã có lỗi xẩy ra ( Lấy danh sách user, file : signupController.js )");
                throw err;
            }else {
                res.json(users);
            } 
        })
    });
}