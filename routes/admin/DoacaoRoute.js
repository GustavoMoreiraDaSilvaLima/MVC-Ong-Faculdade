const express = require('express');
const DoacaoController = require('../../controllers/admin/doacaoController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const autent = new AutenticacaoMiddleware();

const DoacaoRouter = express.Router();

let ctrl = new DoacaoController();



DoacaoRouter.get("/", /*autent.NivelPermissaoAdm,*/ ctrl.ListagemDoacaoView);
DoacaoRouter.get("/", /*autent.NivelPermissaoAdm,*/ ctrl.DoacaoManualView);
DoacaoRouter.post("/", /*autent.NivelPermissaoAdm,*/ ctrl.DoacaoManual);
DoacaoRouter.get("/alterar", /*autent.NivelPermissaoAdm,*/ ctrl.AlterarDoacaoView);
DoacaoRouter.post("/excluir", /*autent.NivelPermissaoAdm,*/ ctrl.excluir);
DoacaoRouter.post('/alterar',/* autent.NivelPermissaoAdm,*/ ctrl.AlterarDoacao);
DoacaoRouter.get("/alterar/search/:id",/* autent.NivelPermissaoAdm,*/ctrl.obterDoacao);
DoacaoRouter.get("/tabela/:intervalo",/* autent.NivelPermissaoAdm,*/ctrl.AtualizarLista);


module.exports = DoacaoRouter;