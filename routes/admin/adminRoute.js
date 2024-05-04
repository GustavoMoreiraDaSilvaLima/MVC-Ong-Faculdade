const express = require('express');
const AdminController = require('../../controllers/admin/adminController');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');

const autent = new AutenticacaoMiddleware();

const adminRouter = express.Router();

let ctrl = new AdminController();



adminRouter.get("/", /*autent.NivelPermissaoAdm,*/ ctrl.adminView);



module.exports = adminRouter;