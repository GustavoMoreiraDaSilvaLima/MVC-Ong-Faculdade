const express = require('express');
const CaixaController = require('../../controllers/admin/caixaController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const autent = new AutenticacaoMiddleware();

const caixaRouter = express.Router();

let ctrl = new CaixaController();



caixaRouter.get("/", /*autent.NivelPermissaoAdm,*/ ctrl.CaixaView);



module.exports = caixaRouter;