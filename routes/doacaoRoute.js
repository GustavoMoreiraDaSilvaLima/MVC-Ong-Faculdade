const express = require('express');
const DoacaoController = require('../controllers/doacaoController');

const router = express.Router();
let ctrl = new DoacaoController();
router.get("/",ctrl.DoacaoView);
router.get("/cartao",ctrl.DoaCartaoView);
router.get("/pix",ctrl.DoaPixView);
router.get("/boleto",ctrl.DoaBoletoView);

module.exports = router;