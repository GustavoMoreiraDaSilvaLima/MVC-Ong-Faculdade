const express = require('express');
const NoticiaController = require('../controllers/NoticiaController');

const router = express.Router();

let ctrl = new NoticiaController();
router.get('/', ctrl.listarNoticias);
router.get('/espec/:id', ctrl.especNoticia);



module.exports = router;