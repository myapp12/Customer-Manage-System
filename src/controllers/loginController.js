var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');

var Users = require('../models/userModel.js'); // sử dụng model(collection) users

var bcrypt = require('bcryptjs');


passport.use(new FacebookStrategy({
    clientID: "2010782642557410",
    clientSecret: "d85c20918d312fc87572229043c09a6c",
    callbackURL: "http://localhost:3000/auth/facebook/cb",
    profileFields : ['email','displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    Users.findOne({email :profile._json.email} ,(err,user) =>{
        if(err){
            console.log("Có lỗi xẩy ra ở login facebook");
            throw err; 
        }
        if(user) { // nếu đã tồn tại user rồi thì điều hướng người dùng đến trang chủ luôn
            return done(null,user); // gọi url callback 
        }
        var newUser = new Users({
            email : profile._json.email,
            fullName : profile._json.name,
            password : "20naZYk&*@s==KAKD((JMSALALA................" // mật khâu tự định nghĩa =))
        });

        newUser.save((err) => { // nếu người dùng chưa tồn tại thì đăng ký cho 1 tài khoản rồi điều hướng đến trang chủ luôn
            console.log("Đăng nhập thành công bằng Facebook...");
            return done(null, newUser); // gọi url callback 
        })


    })
  }
));
passport.serializeUser((user,done) => { // Lấy thông tin lưu vào cookie
    done(null,user.id);
});

passport.deserializeUser((user,done) =>{ // Truy xuất thông tin từ cookie
    Users.findOne({email:user.email},(err,user) => {
        done(null,user);
    });
});



module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());
    // Login
    app.get('/', (req, res) => { // load trang login
        res.render("login.ejs");
    });

    app.get('/auth/facebook', passport.authenticate('facebook',{scope : ['email']})); // điều hướng đến face và yêu cầu thêm thông tin email
    app.get('/auth/facebook/cb', // url callback
    passport.authenticate('facebook', { 
        successRedirect : '/home',  // Xác thực thành công thì điều hướng đến Home
        failureRedirect: '/' // Xác thực không thành công thì điều hướng về login
    }),); 


    app.post('/api/login',(req,res) => {
        bcrypt.compare(req.body.password, req.body.rePassword).then(function(result) { 
            console.log(result);
            if(result){ // trùng với mật khẩu dc mã hóa res = true và ngược lại
                console.log("Đăng nhập thành công ...");
                res.json({
                    result : "true",
                });
            }else{
                console.log("Đăng nhập thất bại ...");
                res.json({
                    result : "flase",
                });
            }
        });
        
    });
    

    
}