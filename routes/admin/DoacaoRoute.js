const express = require('express');
const DoacaoController = require('../../controllers/admin/doacaoController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const autent = new AutenticacaoMiddleware();

const DoacaoRouter = express.Router();

let ctrl = new DoacaoController();



DoacaoRouter.get("/", /*autent.NivelPermissaoAdm,*/ ctrl.ListagemDoacaoView);
DoacaoRouter.get("/nova/produto",  /*autent.NivelPermissaoAdm,*/  ctrl.DoacaoProdutoView);
DoacaoRouter.post("/nova/produto",  /*autent.NivelPermissaoAdm,*/  ctrl.DoacaoProduto);
DoacaoRouter.get("/nova",  /*autent.NivelPermissaoAdm,*/  ctrl.DoacaoManualView);
DoacaoRouter.post("/nova",  /*autent.NivelPermissaoAdm,*/  ctrl.DoacaoManual);
DoacaoRouter.post("/excluir", /*autent.NivelPermissaoAdm,*/ ctrl.excluir);
DoacaoRouter.post('/alterar',/* autent.NivelPermissaoAdm,*/ ctrl.AlterarDoacao);
DoacaoRouter.get("/alterar/search/:id",/* autent.NivelPermissaoAdm,*/ctrl.obterDoacao);
DoacaoRouter.get("/tabela/:intervalo",/* autent.NivelPermissaoAdm,*/ctrl.AtualizarLista);


module.exports = DoacaoRouter;
