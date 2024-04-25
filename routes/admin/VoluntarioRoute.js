const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const VoluntarioController = require('../../controllers/admin/voluntarioController');

const autent = new AutenticacaoMiddleware();

const VoluntarioRouter = express.Router();

let ctrl = new VoluntarioController();

VoluntarioRouter.get("/voluntarios", autent.NivelPermissaoAdm, ctrl.voluntariosView);
VoluntarioRouter.get("/voluntarios/:cpf", autent.NivelPermissaoAdm, ctrl.voluntariosAlterarView);
VoluntarioRouter.post("/voluntarios", autent.NivelPermissaoAdm, ctrl.voluntariosDel);

module.exports = VoluntarioRouter;