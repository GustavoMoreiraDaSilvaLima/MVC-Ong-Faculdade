const express = require('express');
const MarcaController = require('../../controllers/admin/MarcaController');

const marcaRouter = express.Router();

let ctrl = new MarcaController();
marcaRouter.get('/', ctrl.listarView);


module.exports = marcaRouter;