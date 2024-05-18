const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const VendaController = require('../../controllers/admin/vendaController');

const autent = new AutenticacaoMiddleware();
const VendaRouter = express.Router();

let ctrl = new VendaController();

VendaRouter.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.VendasView);
VendaRouter.get('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.AlterarVendaView);
VendaRouter.post('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.AlterarVenda);
VendaRouter.get('/excluir'/*,autent.NivelPermissaoAdm*/,ctrl.ExcluirVenda);

module.exports = VendaRouter;