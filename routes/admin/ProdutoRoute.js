const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const ProdutoController = require('../../controllers/admin/produtosController');

//const autent = new AutenticacaoMiddleware();
const ProdutoRouterAdmin = express.Router();

let ctrl = new ProdutoController() 

ProdutoRouterAdmin.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.listarView);


module.exports = ProdutoRouterAdmin;