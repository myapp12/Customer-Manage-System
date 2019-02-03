var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var session = require('express-session');

var express = require('express'); // use express
var morgan = require('morgan'); // thư viện ghi ra các request đến server
const mongooseConnection = require('./configs/mongodb/db.js'); // Kết nối đến mongodb client
var bodyParser = require('body-parser'); // thư viện lấy dữ liệu từ body gửi lên sever
var app = express(); // sử dụng express
var http = require('http').Server(app);
var PORT = process.env.PORT || 3000; // Khởi tạo cổng (port)


app.use(passport.initialize());
app.use(passport.session());


var Users = require('./src/models/userModel.js'); // sử dụng model(collection) users



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
        if(user) {
            return done(null,user);
        }
        var newUser = new Users({
            email : profile._json.email,
            fullName : profile._json.name,
            password : "hifdshifojaidaosjojo12jo31ooidjsajodjajijdsadjioasiod"
        });

        newUser.save((err) => {
            return done(null, newUser);
        })


    })
  }
));











// Khai báo controllers 
var loginController = require('./src/controllers/loginController.js');
var signupController = require('./src/controllers/signupController.js');

// end- khai báo controllers





app.set("view engine","ejs"); //  sử dụng view engine ejs 
app.use(morgan("dev"));
app.use('/assets', express.static(__dirname + "/public")); // khai báo đường link tĩnh đến file command
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));






// use controller
loginController(app); // login
signupController(app);


// end use controller










app.get('/auth/facebook', passport.authenticate('facebook',{scope : ['email']}));
app.get('/auth/facebook/cb',
  passport.authenticate('facebook', { 
       successRedirect : '/', 
       failureRedirect: '/' 
  }),);    

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) =>{
    mongooseConnection.findOne({id:id},(err,user) => {
        done(null,user);
    });
})


















http.listen(PORT , () => { // lắng nghe
    console.log(`Application listening on PORT: ${PORT}`);
})




