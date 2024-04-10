const express = require('express');
const HomeController = require('../controllers/homeController');

const router = express.Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);
router.get("/QuemSomos", ctrl.QuemSomosView);
router.get("/noticia", ctrl.NoticiaView);
router.get("/doacao",ctrl.DoacaoView);
router.get("/doacao/cartao",ctrl.DoaCartaoView);
router.get("/doacao/pix",ctrl.DoaPixView);
router.get("/doacao/boleto",ctrl.DoaBoletoView);
router.get("/seja_um_voluntario", ctrl.sejaView);
router.post("/seja_um_voluntario", ctrl.sejaViewPost);

module.exports = router;