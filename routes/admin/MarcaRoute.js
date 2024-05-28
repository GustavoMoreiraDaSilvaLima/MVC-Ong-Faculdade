const express = require('express');
const MarcaController = require('../../controllers/admin/MarcaController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const marcaRouter = express.Router();
const autent = new AutenticacaoMiddleware();

let ctrl = new MarcaController();
marcaRouter.get('/',autent.NivelPermissaoAdm,  ctrl.listarView);

autent.NivelPermissaoAdm,
module.exports = marcaRouter;