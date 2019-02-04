var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



var session = require('express-session');

const authFacebook = require('../../configs/auth/auth.js');

var Users = require('../models/userModel.js'); // sử dụng model(collection) users

var bcrypt = require('bcryptjs');

// fb
passport.use(new FacebookStrategy({
    clientID: authFacebook.fbAuth.clientID,
    clientSecret: authFacebook.fbAuth.clientSecret,
    callbackURL: authFacebook.fbAuth.callbackURL,
    profileFields : authFacebook.fbAuth.profileFields
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
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
            password : "20naZYk&*@s==KAKD((JMSALALA................facebook" // mật khâu tự định nghĩa =))
        });

        newUser.save((err) => { // nếu người dùng chưa tồn tại thì đăng ký cho 1 tài khoản rồi điều hướng đến trang chủ luôn
            console.log("Đăng nhập thành công bằng Facebook...");
            return done(null, newUser); // gọi url callback 
        })


    })
  }
));



//gg+
passport.use(new GoogleStrategy({
    clientID: authFacebook.ggAuth.clientID,
    clientSecret: authFacebook.ggAuth.clientSecret,
    callbackURL: authFacebook.ggAuth.callbackURL,
    profileFields : authFacebook.ggAuth.profileFields
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
    Users.findOne({email :profile.emails[0].value} ,(err,user) =>{
        if(err){
            console.log("Có lỗi xẩy ra ở login Google+");
            throw err; 
        }
        if(user) { // nếu đã tồn tại user rồi thì điều hướng người dùng đến trang chủ luôn
            return done(null,user); // gọi url callback 
        }
        var newUser = new Users({
            email : profile.emails[0].value,
            fullName : profile.displayName,
            password : "20naZYk&*@s==KAKD((JMSALALA................google+" // mật khâu tự định nghĩa =))
        });

        newUser.save((err) => { // nếu người dùng chưa tồn tại thì đăng ký cho 1 tài khoản rồi điều hướng đến trang chủ luôn
            console.log("Đăng nhập thành công bằng Google+...");
            return done(null, newUser); // gọi url callback 
        })


    });
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
    
    //FBook
    app.get('/auth/facebook', passport.authenticate('facebook',{scope : ['email']})); // điều hướng đến face và yêu cầu thêm thông tin email
    app.get('/auth/facebook/cb', // url callback
    passport.authenticate('facebook', { 
        successRedirect : '/home',  // Xác thực thành công thì điều hướng đến Home
        failureRedirect: '/' // Xác thực không thành công thì điều hướng về login
    }),); 

    // google+
    app.get('/auth/google', passport.authenticate('google',{scope : ['email','profile']})); // điều hướng đến face và yêu cầu thêm thông tin email
    app.get('/auth/google/cb', // url callback
    passport.authenticate('google', { 
        successRedirect : '/home',  // Xác thực thành công thì điều hướng đến Home
        failureRedirect: '/' // Xác thực không thành công thì điều hướng về login
    }),); 



    app.post('/api/login',(req,res) => {
        bcrypt.compare(req.body.password, req.body.rePassword).then(function(result) { 
            //console.log(result);
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