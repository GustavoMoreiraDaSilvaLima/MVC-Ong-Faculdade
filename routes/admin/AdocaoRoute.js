const express = require('express');
const AdocaoController = require('../../controllers/admin/AdocaoController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const autent = new AutenticacaoMiddleware();

const AdocaoRoute = express.Router();

let ctrl = new AdocaoController();

AdocaoRoute.get("/", autent.NivelPermissaoAdm, ctrl.AdocaoView);



module.exports = AdocaoRoute;
