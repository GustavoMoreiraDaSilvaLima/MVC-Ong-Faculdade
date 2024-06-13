const express = require("express");
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const PedidoController = require('../../controllers/admin/pedidoController');

const autent = new AutenticacaoMiddleware();
const PedidoRouter = express.Router();

let ctrl = new PedidoController();

PedidoRouter.get("/", autent.NivelPermissaoAdm, ctrl.listarView);

module.exports = PedidoRouter;
 