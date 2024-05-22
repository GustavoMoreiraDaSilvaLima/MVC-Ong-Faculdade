const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');

const produtoRouter = express.Router();


let ctrl = new ProdutoController
produtoRouter.get('/', ctrl.listarView);
produtoRouter.get("/obter/:produto", ctrl.obter)

module.exports = produtoRouter;