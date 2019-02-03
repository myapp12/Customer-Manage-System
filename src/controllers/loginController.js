var Users = require('../models/userModel.js'); // sử dụng model(collection) users



module.exports = (app) => {

    // Login
    app.get('/', (req, res) => {
        res.render("login.ejs");
    });

    app.get('/api/users',(req,res) => {

    });
}