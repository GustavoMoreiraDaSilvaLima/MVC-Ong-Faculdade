const express = require("express");
const multer = require("multer")
const AutenticacaoMiddleware = require("../../middlewares/autenticacaoMiddleware");
const NoticiaController = require("../../controllers/admin/NoticiaController");

const autent = new AutenticacaoMiddleware();

const NoticiaRouter = express.Router();

let ctrl = new NoticiaController()
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/noticias");
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split(".").pop();
        //ou
        //
        //let ext = file.originalname.split(".").slice(-1)[0]
        let novoNome = Date.now().toString() + "." + ext;
        cb(null, novoNome);
    }
})
let upload = multer({storage});


NoticiaRouter.get("/", autent.NivelPermissaoAdm,ctrl.listarNoticias);
NoticiaRouter.get("/adminCadastrar",autent.NivelPermissaoAdm,ctrl.adicionarNoticaView);
NoticiaRouter.post("/adminCadastrar",autent.NivelPermissaoAdm,upload.single("imagem"), ctrl.adicionarNoticia);
NoticiaRouter.get("/adminEditar/:id", autent.NivelPermissaoAdm,ctrl.editarNoticiaView);
NoticiaRouter.post("/adminEditar",autent.NivelPermissaoAdm,upload.single("imagem"), ctrl.editarNoticia);
NoticiaRouter.post("/excluir/:id", autent.NivelPermissaoAdm,ctrl.excluirNoticia);


module.exports = NoticiaRouter;
