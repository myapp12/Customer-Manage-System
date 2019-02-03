
var express = require('express'); // use express
var morgan = require('morgan'); // thư viện ghi ra các request đến server
const mongooseConnection = require('./configs/mongodb/db.js'); // Kết nối đến mongodb client
var bodyParser = require('body-parser'); // thư viện lấy dữ liệu từ body gửi lên sever
var app = express(); // sử dụng express
var http = require('http').Server(app);
var PORT = process.env.PORT || 3000; // Khởi tạo cổng (port)





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








http.listen(PORT , () => { // lắng nghe
    console.log(`Application listening on PORT: ${PORT}`);
})




