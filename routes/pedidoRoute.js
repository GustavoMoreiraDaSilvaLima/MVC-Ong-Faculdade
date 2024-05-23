const express = require('express');
const PedidoController = require('../controllers/pedidoController');

const pedidoRouter = express.Router();

let ctrl = new PedidoController();
pedidoRouter.post('/gravar', ctrl.gravar);


module.exports = pedidoRouter;