const express = require('express');
const LoginController = require('../controllers/loginController');

const LoginRouter = express.Router();
let ctrl = new LoginController();

LoginRouter.get('/',ctrl.loginView);
LoginRouter.post('/validar',ctrl.login);


module.exports = LoginRouter;