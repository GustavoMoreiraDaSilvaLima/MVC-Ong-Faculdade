const express = require('express');
const CategoriaController = require('../../controllers/admin/CategoriaController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const categoriaRouter = express.Router();

const autent = new AutenticacaoMiddleware();


router = express.Router();

let ctrl = new CategoriaController()
categoriaRouter.get('/',autent.NivelPermissaoAdm, ctrl.listarView);

module.exports = categoriaRouter;