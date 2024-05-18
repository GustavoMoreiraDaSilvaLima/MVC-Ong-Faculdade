//Controller para o voluntário poder acessar seu perfil
const express = require('express');
const VoluntarioController = require('../../controllers/admin/voluntarioController');
const AutenticacaoMiddleware=require('../../middlewares/autenticacaoMiddleware');

const PerfilRouter = express.Router();
const autent = new AutenticacaoMiddleware();

let ctrl = new VoluntarioController();

PerfilRouter.get("/voluntario"/*,autent.NivelPermissaoVoluntario*/,ctrl.VoluntarioPerfil);
//middleware para ver se é voluntário
PerfilRouter.post("/EditarPerfil"/*,autent.NivelPermissaoVoluntario*/,ctrl.editarPerfilVoluntario);

module.exports = PerfilRouter;