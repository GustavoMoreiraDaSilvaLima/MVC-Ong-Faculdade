const express = require('express');
const LoginController = require('../controllers/loginController');

const LoginRouter = express.Router;
let ctrl = new LoginController();


//module.exports = LoginRouter;