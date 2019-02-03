
module.exports = (app) => {

    // Login
    app.get('/', (req, res) => {
        res.render("login.ejs");
    });

    
}