//Rota de envios de formulários da Home
const express = require('express');
const EnvioController = require('../controllers/envioController');

const EnvioRouter = express.Router();
let ctrl = new EnvioController();

//Envio de formulário de doação
EnvioRouter.post("/boleto", ctrl.RecebaDoaBoleto);
EnvioRouter.post("/pix", ctrl.RecebaDoaPix);
EnvioRouter.post("/cartao", ctrl.RecebaDoaCartao);
EnvioRouter.post("/doacao", ctrl.RecebaOutraDoa);

//Post Voluntário
EnvioRouter.post("/seja_um_voluntario", ctrl.sejaViewPost);
EnvioRouter.post('/venda', ctrl.ReceberVenda);



//Envio de formulário

module.exports = EnvioRouter;