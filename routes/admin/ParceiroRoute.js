const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const ParceiroController = require('../../controllers/admin/parceiroController');

const autent = new AutenticacaoMiddleware();
const ParceiroRouter = express.Router();

let ctrl = new ParceiroController;

ParceiroRouter.get('/'/*, autent.NivelPermissaoAdm*/, ctrl.parceiroView);
ParceiroRouter.get('/cadastrar'/*, autent.NivelPermissaoAdm*/, ctrl.adicionarParceiroView);
ParceiroRouter.get('/editar'/*, autent.NivelPermissaoAdm*/, ctrl.editarParceiroView);
ParceiroRouter.post('/cadastrar'/*, autent.NivelPermissaoAdm*/, ctrl.adicionarParceiro);
ParceiroRouter.post('/editar'/*, autent.NivelPermissaoAdm*/, ctrl.editarParceiro);
ParceiroRouter.post('/excluir'/*, autent.NivelPermissaoAdm*/, ctrl.excluirParceiro);

module.exports = ParceiroRouter;