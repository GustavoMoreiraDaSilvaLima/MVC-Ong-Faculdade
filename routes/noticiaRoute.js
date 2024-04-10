const express = require('express');
const NoticiaController = require('../controllers/NoticiaController');

const router = express.Router();

let ctrl = new NoticiaController();
router.get('/', ctrl.listarNoticias);



module.exports = router;