const express = require("express");
const multer = require("multer")
const AutenticacaoMiddleware = require("../../middlewares/autenticacaoMiddleware");
const PatrimonioController = require("../../controllers/admin/patrimonioController");
const PatrimonioRouter = express.Router();



const autent = new AutenticacaoMiddleware();


let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/produtos");
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


let ctrl = new PatrimonioController();

PatrimonioRouter.get("/",autent.NivelPermissaoAdm,ctrl.patrimonioView);
PatrimonioRouter.get("/adminCadastrar",autent.NivelPermissaoAdm,ctrl.cadastrarPatrimonioView);
PatrimonioRouter.post("/adminCadastrar",autent.NivelPermissaoAdm,upload.single("imagem",), ctrl.cadastrarPatrimonioPost);
PatrimonioRouter.post("/adminEditar",autent.NivelPermissaoAdm,upload.single("imagem",), ctrl.EditarPatrimonioPost);
PatrimonioRouter.get("/alterar/:id",autent.NivelPermissaoAdm,ctrl.editarPatrimonioView);
PatrimonioRouter.post("/alterar",autent.NivelPermissaoAdm,ctrl.exibirPatrimonioPost);
PatrimonioRouter.post("/excluir/:id",autent.NivelPermissaoAdm,ctrl.excluirPatrimonio);

PatrimonioRouter.get("/listaCompleta",autent.NivelPermissaoAdm,ctrl.Listar)//Rota para listar todos os produtos

//Noticia
PatrimonioRouter.get("/patrimonio", ctrl.patrimonioView);
PatrimonioRouter.get("/espec/:id", async (req,res) => {
ctrl.especPatrimonio(req,res);
})

module.exports = PatrimonioRouter;
