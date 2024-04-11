const express = require('express');
const DoacaoController = require('../controllers/doacaoController');

const router = express.Router();
let ctrl = new DoacaoController();
router.get("/",ctrl.DoacaoView);
router.get("/cartao",ctrl.DoaCartaoView);
router.get("/pix",ctrl.DoaPixView);
router.get("/boleto",ctrl.DoaBoletoView);
router.post("/boleto",ctrl.RecebaDoaBoleto);
router.post("/pix",ctrl.RecebaDoaPix);
router.post("/cartao",ctrl.RecebaDoaCartao);
router.post("/doacao",ctrl.RecebaOutraDoa)

module.exports = router;