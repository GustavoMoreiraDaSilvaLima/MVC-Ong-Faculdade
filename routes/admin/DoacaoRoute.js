const express = require('express');
const DoacaoController = require('../../controllers/admin/doacaoController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const autent = new AutenticacaoMiddleware();

const DoacaoRouter = express.Router();

let ctrl = new DoacaoController();



DoacaoRouter.get("/", autent.NivelPermissaoAdm, ctrl.ListagemDoacaoView);
DoacaoRouter.get("/alterar", autent.NivelPermissaoAdm,ctrl.AlterarDoacaoView);
DoacaoRouter.post("/excluir", autent.NivelPermissaoAdm, ctrl.excluir);
DoacaoRouter.post('/alterar', autent.NivelPermissaoAdm, ctrl.AlterarDoacao);


module.exports = router;