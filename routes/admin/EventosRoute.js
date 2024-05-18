const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const EventoController = require('../../controllers/admin/eventosController');

const autent = new AutenticacaoMiddleware();
const EventoRouter = express.Router();

let ctrl = new EventoController();

EventoRouter.get('/'/*, autent.NivelPermissaoAdm*/, ctrl.EventosView);
EventoRouter.get('/cadastrar'/*, autent.NivelPermissaoAdm*/, ctrl.EventosCadastrarView);
EventoRouter.get('/alterar'/*,autent.NivelPermissaoAdm*/, ctrl.EventosAlterView);
EventoRouter.post('/cadastrar'/*,autent.NivelPermissaoAdm*/, ctrl.EventosCadastrar);
EventoRouter.post("/alterar"/*,autent.NivelPermissaoAdm*/, ctrl.EventosAlterar);
EventoRouter.post('/excluir'/*, autent.NivelPermissaoAdm*/, ctrl.EventoExcluir);

module.exports = EventoRouter;
