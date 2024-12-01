const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const VoluntarioController = require('../../controllers/admin/voluntarioController');

const autent = new AutenticacaoMiddleware();

const VoluntarioRouter = express.Router();

let ctrl = new VoluntarioController();

VoluntarioRouter.get("/", ctrl.voluntariosView);
VoluntarioRouter.get("/:cpf",  ctrl.voluntariosAlterarView);
VoluntarioRouter.post("/deletacao",  ctrl.voluntariosDel);
VoluntarioRouter.post("/alterar",  ctrl.atualizarVoluntario);

module.exports = VoluntarioRouter;
 