var Users = require('../models/userModel.js'); // sử dụng model(collection) users
var bcrypt = require('bcryptjs');
var fs = require('fs');
var multer = require('multer');





module.exports = (app) => {

    var email = "";
    // const handleError = (err, res) => {
    //     res
    //       .status(500)
    //       .contentType("text/plain")
    //       .end("Oops! Something went wrong!");
    // };
    // const upload = multer({
    //     dest: "/public/images/uploads"
    //     // you might also want to set some limits: https://github.com/expressjs/multer#limits
    // });

    var storage = multer.diskStorage({  
        destination: (req, file, cb) => {
          cb(null, 'public/images/uploads');
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        }
    });

    var upload = multer({storage: storage});

    app.post('/api/signup',(req,res,next) => {
        // /* Ma hoa mat khau use : npm i bcryptjs --save */
        // var salt = bcrypt.genSaltSync(10);
        // var hash = bcrypt.hashSync(req.body.password,salt);

        // var path = req.file.destination + '/' + req.file.filename;

        // var user = new Users;
        // user.fullName = req.body.fullName;
        // user.email = req.body.email;
        // user.password = hash;
        // user.image.data = fs.readFileSync(path);
        // user.image.contentType = "image/png";


        // /* Thêm một đối tượng user vào trong mongodb */
        // if(req.body.password === req.body.repeatPassword && user.image !== null){
        //     user.save((err) => {
        //         if (err) {
        //             console.log("Đã có lỗi xẩy ra ( Đăng ký tài khoản mới, file : signupController.js )");
        //             throw err;
        //         }else {
        //             console.log('Đăng ký thành công userName: ' + req.body.email);
        //             res.render("login.ejs");
        //         }
        //     });
        // }else {
        //     res.send("Đăng ký thất bại");
        // }
        
        // /* end add */
        /* Ma hoa mat khau use : npm i bcryptjs --save */
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password,salt);
        /* key thuc Ma hoa mat khau tra ve hash da dc ma hoa */
    

        var user = {
            fullName : req.body.fullName,
            email : req.body.email,
            password : hash,
            image : {
                data : fs.readFileSync("public/images/uploads/user.png"),
                contentType : "image/png"
            }
        }

        /* Thêm một đối tượng user vào trong mongodb */
        Users.create(user,(err,user) => {
            if (err) {
                console.log("Đã có lỗi xẩy ra ( Đăng ký tài khoản mới, file : signupController.js )");
                throw err;
            }else {
                console.log('Đăng ký thành công userName: ' + req.body.email);
                email = user.email;
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


    app.get('/success/signup',(req,res) => {
        res.render("successSignup.ejs");
    });

    app.post('/successSignup', upload.single("file"),(req,res)=>{
        Users.findOne({email : email},function(err,user){
            if(err){
                console.log("Ui có biến đại ca ơi... file : signupController, url : /successSignup");
                throw err;
            }else{
                var path = req.file.destination + '/' + req.file.filename;
                user.image = {
                    data : fs.readFileSync(path),
                    contentType : "image/png"
                }
                user.save((err)=>{
                    if(err){
                        console.log("Ui có biến đại ca ơi... file : signupController, url : /successSignup");
                        throw err;
                    }else{
                        console.log("Thêm thông tin thành công ...");
                        res.render("login.ejs");
                    }
                });
            }
        });
    });

    
}