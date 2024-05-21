const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');
//const AuthMiddleware = require('../middlewares/authMiddleware');

const produtoRouter = express.Router();

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

let ctrl = new ProdutoController
//let auth = new AuthMiddleware();
produtoRouter.get('/', /*auth.verificarUsuarioLogado,*/ ctrl.listarView);
produtoRouter.get('/cadastro',  /*auth.verificarUsuarioLogado ,*/ ctrl.cadastroView);
produtoRouter.post("/cadastro",  /*auth.verificarUsuarioLogado,*/ upload.single("imagem"), ctrl.cadastrarProduto);
produtoRouter.post("/excluir",  /*auth.verificarUsuarioLogado,*/ ctrl.excluirProduto);
produtoRouter.get("/alterar/:id",  /*auth.verificarUsuarioLogado,*/ ctrl.alterarView);
produtoRouter.post("/alterar",  /*auth.verificarUsuarioLogado,*/ upload.single("imagem"), ctrl.alterarProduto);
produtoRouter.get("/obter/:produto", ctrl.obter)

module.exports = produtoRouter;