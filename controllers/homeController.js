const homeModel = require("../models/homeModel");
class homeController {
    homeView(req, res) {
        let usuario = 'visitante';
        res.render('home', { user: usuario });
    }
    loginView(req, res) {
        res.render('login', { layout: 'login' });
    }
    login(req, res) {
        let 
    }
}
module.exports = homeController;