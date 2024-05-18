//Rotas todas sem middleware, todas liberadas
const express = require('express');
const HomeController = require('../controllers/homeController');

const router = express.Router();
let ctrl = new HomeController();
router.get("/", ctrl.homeView);
router.get("/QuemSomos", ctrl.QuemSomosView);
router.get("/seja_um_voluntario", ctrl.sejaView);

//Doacao
router.get("/doacao",ctrl.DoacaoView);
router.get("/doacao/cartao",ctrl.DoaCartaoView);
router.get("/doacao/pix",ctrl.DoaPixView);
router.get("/doacao/boleto",ctrl.DoaBoletoView);

//Noticia
router.get('/noticias', ctrl.listarNoticias);
router.get('/espec/:id', async (req,res) => {
    ctrl.especNoticia(req,res);
})


module.exports = router;