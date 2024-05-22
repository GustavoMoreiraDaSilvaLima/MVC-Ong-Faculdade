const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const ProdutoController = require('../../controllers/admin/produtosController');

//const autent = new AutenticacaoMiddleware();
const ProdutoRouterAdmin = express.Router();

let ctrl = new ProdutoController() 

ProdutoRouterAdmin.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.listarView);
ProdutoRouterAdmin.get('/cadastro'/*,autent.NivelPermissaoAdm*/,ctrl.cadastroView);
ProdutoRouterAdmin.post('/cadastro'/*,autent.NivelPermissaoAdm*/,ctrl.cadastrarProduto);
//ProdutoRouterAdmin.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.ProdutoView);
//ProdutoRouterAdmin.get('/inserir'/*,autent.NivelPermissaoAdm*/,ctrl.inserirProdutoView);
//ProdutoRouterAdmin.get('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.alterarProdutoView);
//ProdutoRouterAdmin.post('/inserir'/*,autent.NivelPermissaoAdm*/,ctrl.inserirProduto);
//ProdutoRouterAdmin.post('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.alterarProduto);
//ProdutoRouterAdmin.post('/deletar'/*,autent.NivelPermissaoAdm*/,ctrl.deletarProduto);

module.exports = ProdutoRouterAdmin;