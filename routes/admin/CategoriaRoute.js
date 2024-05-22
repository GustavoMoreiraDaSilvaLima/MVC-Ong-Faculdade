const express = require('express');
const CategoriaController = require('../../controllers/admin/CategoriaController');

const categoriaRouter = express.Router();

router = express.Router();

let ctrl = new CategoriaController()
categoriaRouter.get('/', ctrl.listarView);

module.exports = categoriaRouter;