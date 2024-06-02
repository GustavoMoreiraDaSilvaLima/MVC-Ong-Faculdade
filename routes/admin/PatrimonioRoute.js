const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const PatrimonioController = require('../../controllers/admin/patrimonioController');

const autent = new AutenticacaoMiddleware();
const PatrimonioRouter = express.Router();

let ctrl = new PatrimonioController();

PatrimonioRouter.get('/',autent.NivelPermissaoAdm,ctrl.patrimonioView);
PatrimonioRouter.get('/adminCadastrar',autent.NivelPermissaoAdm,ctrl.cadastrarPatrimonioView);
PatrimonioRouter.get('/alterar/:id',autent.NivelPermissaoAdm,ctrl.editarPatrimonioView);
PatrimonioRouter.post('/adminCadastrar',autent.NivelPermissaoAdm,ctrl.patrimonioPost);
PatrimonioRouter.post('/alterar',autent.NivelPermissaoAdm,ctrl.atualizarPatrimonioPost);
PatrimonioRouter.post('/excluir',autent.NivelPermissaoAdm,ctrl.excluirPatrimonio);

PatrimonioRouter.get("/listaCompleta",autent.NivelPermissaoAdm,ctrl.Listar)//Rota para listar todos os produtos

//Noticia
PatrimonioRouter.get('/patrimonio', ctrl.patrimonioView);
PatrimonioRouter.get('/espec/:id', async (req,res) => {
    ctrl.especPatrimonio(req,res);
})

module.exports = PatrimonioRouter;
