const express = require("express");
const AutenticacaoMiddleware = require("../../middlewares/autenticacaoMiddleware");
const AdminController = require("../../controllers/admin/adminController");

const autent = new AutenticacaoMiddleware();

const adminRouter = express.Router();

let ctrl = new AdminController();

adminRouter.get("/",  ctrl.adminView);
adminRouter.get("/cadastrarVoluntario",  ctrl.adminView2);

module.exports = adminRouter;
