var Users = require('../models/userModel.js'); // sử dụng model(collection) users
var bcrypt = require('bcryptjs');





/*
    Lấy danh sách user từ mongodb
*/
var getUsers = (res) => {

    Users.find(function(err, users){
        if(err){
            throw err;
        }else {
            res.json(users);
        }
    })
}

module.exports = (app) => {

    app.post('/signup',(req,res) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password,salt);
        var user = {
            fullName : req.body.fullName,
            email : req.body.email,
            password : hash
        }

        Users.create(user,(err,user) => {
            console.log('test')
            res.send(user);
        });



        //res.send("Ma hoa : " + hash);
    })
}