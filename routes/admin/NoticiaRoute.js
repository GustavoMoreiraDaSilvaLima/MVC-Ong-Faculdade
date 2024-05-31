const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const NoticiaController = require('../../controllers/admin/NoticiaController');

const autent = new AutenticacaoMiddleware();
const NoticiaRouter = express.Router();

let ctrl = new NoticiaController()

NoticiaRouter.get('/', autent.NivelPermissaoAdm,ctrl.listarNoticias);
NoticiaRouter.get('/adminCadastrar',autent.NivelPermissaoAdm,ctrl.adicionarNoticaView);
NoticiaRouter.get('/adminEditar/:id', autent.NivelPermissaoAdm,ctrl.editarNoticiaView);
NoticiaRouter.post('/adminCadastrar', autent.NivelPermissaoAdm,ctrl.adicionarNoticia);
NoticiaRouter.post('/adminEditar', autent.NivelPermissaoAdm,ctrl.editarNoticia);
NoticiaRouter.post('/excluir/:id', autent.NivelPermissaoAdm,ctrl.excluirNoticia);


module.exports = NoticiaRouter;
