const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const ProdutoController = require('../../controllers/admin/produtosController');

//const autent = new AutenticacaoMiddleware();
const ProdutoRouter = express.Router();

let ctrl = new ProdutoController() 
//
//ProdutoRouter.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.ProdutoView);
//ProdutoRouter.get('/inserir'/*,autent.NivelPermissaoAdm*/,ctrl.inserirProdutoView);
//ProdutoRouter.get('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.alterarProdutoView);
//ProdutoRouter.post('/inserir'/*,autent.NivelPermissaoAdm*/,ctrl.inserirProduto);
//ProdutoRouter.post('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.alterarProduto);
//ProdutoRouter.post('/deletar'/*,autent.NivelPermissaoAdm*/,ctrl.deletarProduto);

module.exports = ProdutoRouter;