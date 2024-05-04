const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const ProjetoController = require('../../controllers/admin/projetosController');

const autent = new AutenticacaoMiddleware();
const ProjetoRouter = express.Router();

let ctrl = new ProjetoController;

ProjetoRouter.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.ProjetosView);
ProjetoRouter.get('/adicionar'/*,autent.NivelPermissaoAdm*/,ctrl.adicionarProjetoView);
ProjetoRouter.get('/editar'/*,autent.NivelPermissaoAdm*/,ctrl.editarProjetoView);
ProjetoRouter.post('/adicionar'/*,autent.NivelPermissaoAdm*/,ctrl.adicionarProjeto);
ProjetoRouter.post('/editar'/*,autent.NivelPermissaoAdm*/,ctrl.editarProjeto);
ProjetoRouter.post('/excluir'/*,autent.NivelPermissaoAdm*/,ctrl.excluirProjeto);


module.exports = ProjetoRouter;