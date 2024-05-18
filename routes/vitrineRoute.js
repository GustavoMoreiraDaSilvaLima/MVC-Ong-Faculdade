const express = require('express');
const produtoController = require('../controllers/produtoController');

const vitrineRoute = express.Router();

let ctrl = new produtoController();
vitrineRoute.get("/", ctrl.vitrineView);

module.exports = vitrineRoute;