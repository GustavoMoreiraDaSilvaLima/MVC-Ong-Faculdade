const express = require('express');
const multer = require("multer")
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const ProdutoController = require('../../controllers/admin/produtosController');

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


let ctrl = new ProdutoController() 

ProdutoRouterAdmin.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.listarView);
ProdutoRouterAdmin.get('/cadastro'/*,autent.NivelPermissaoAdm*/,ctrl.cadastroView);
ProdutoRouterAdmin.post('/cadastro'/*,autent.NivelPermissaoAdm*/,upload.single("imagem"), ctrl.cadastrarProduto);
//ProdutoRouterAdmin.get('/'/*,autent.NivelPermissaoAdm*/,ctrl.ProdutoView);
//ProdutoRouterAdmin.get('/inserir'/*,autent.NivelPermissaoAdm*/,ctrl.inserirProdutoView);
//ProdutoRouterAdmin.get('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.alterarProdutoView);
//ProdutoRouterAdmin.post('/inserir'/*,autent.NivelPermissaoAdm*/,ctrl.inserirProduto);
//ProdutoRouterAdmin.post('/alterar'/*,autent.NivelPermissaoAdm*/,ctrl.alterarProduto);
//ProdutoRouterAdmin.post('/deletar'/*,autent.NivelPermissaoAdm*/,ctrl.deletarProduto);

module.exports = ProdutoRouterAdmin;