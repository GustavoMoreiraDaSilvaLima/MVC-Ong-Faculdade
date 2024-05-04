const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const PatrimonioController = require('../../controllers/admin/patrimonioController');

const autent = new AutenticacaoMiddleware();
const PatrimonioRouter = express.Router();

let ctrl = new PatrimonioController();

PatrimonioRouter.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.patrimonioView);
PatrimonioRouter.get('/novo'/*,autent.NivelPermissaoAdm*/,ctrl.adiocionarPatrimonioView);
PatrimonioRouter.get('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.editarPatrimonioView);
PatrimonioRouter.post('/novo'/*,autent.NivelPermissaoAdm*/,ctrl.adiocionarPatrimonio);
PatrimonioRouter.post('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.editarPatrimonio);
PatrimonioRouter.post('/excluir'/*,autent.NivelPermissaoAdm*/,ctrl.excluirPatrimonio);

module.exports = PatrimonioRouter;