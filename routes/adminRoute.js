const express = require('express');
const AdminController = require('../controllers/adminController');

const router = express.Router();
let ctrl = new AdminController();
router.get("/doacao",ctrl.ListagemDoacaoView);
router.post("/doacao/excluir",excluir);

module.exports = router;