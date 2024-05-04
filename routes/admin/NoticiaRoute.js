const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const NoticiaController = require('../../controllers/admin/NoticiaController');

const autent = new AutenticacaoMiddleware();
const NoticiaRouter = express.Router();

let ctrl = new NoticiaController()

NoticiaRouter.get('/'/*, autent.NivelPermissaoAdm*/,ctrl.listarNoticias);
NoticiaRouter.get('/adicionar'/*,autent.NivelPermissaoAdm*/,ctrl.adicionarNoticaView);
NoticiaRouter.get('/alterar'/*, autent.NivelPermissaoAdm*/,ctrl.editarNoticiaView);
NoticiaRouter.post('/adicionar'/*, autent.NivelPermissaoAdm*/,ctrl.adicionarNoticia);
NoticiaRouter.post('/alterar'/*, autent.NivelPermissaoAdm*/,ctrl.editarNoticia);
NoticiaRouter.post('/excluir'/*, autent.NivelPermissaoAdm*/,ctrl.excluirNoticia);


module.exports = NoticiaRouter;