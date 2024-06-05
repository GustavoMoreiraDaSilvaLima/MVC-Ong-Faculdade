const express = require("express");
const multer = require("multer")
const AutenticacaoMiddleware = require("../../middlewares/autenticacaoMiddleware");
const ProdutoController = require("../../controllers/admin/produtosController");

//const autent = new AutenticacaoMiddleware();
const ProdutoRouterAdmin = express.Router();


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

let autent = new AutenticacaoMiddleware()

let ctrl = new ProdutoController() 
 
     
ProdutoRouterAdmin.get("/",autent.NivelPermissaoAdm,ctrl.listarView);
ProdutoRouterAdmin.get("/cadastro",autent.NivelPermissaoAdm,ctrl.cadastroView);
ProdutoRouterAdmin.post("/cadastro",autent.NivelPermissaoAdm,upload.single("imagem"), ctrl.cadastrarProduto);

ProdutoRouterAdmin.get("/alterar/:id",autent.NivelPermissaoAdm,ctrl.alterarView);
ProdutoRouterAdmin.post("/alterar",autent.NivelPermissaoAdm,upload.single("imagem"), ctrl.alterarProduto);
ProdutoRouterAdmin.post("/deletar",autent.NivelPermissaoAdm,ctrl.excluirProduto);
ProdutoRouterAdmin.get("/tabela", autent.NivelPermissaoAdm, ctrl.AtualizarLista);
ProdutoRouterAdmin.get("/listaCompleta",autent.NivelPermissaoAdm, ctrl.Listar)//Rota para listar todos os produtos
ProdutoRouterAdmin.post("/filtrar", autent.NivelPermissaoAdm, ctrl.Filtracao);


module.exports = ProdutoRouterAdmin;