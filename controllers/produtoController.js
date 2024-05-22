const ProdutoModel = require("../models/produtoModel");
const fs = require("fs");

class ProdutoController {

    async listarView(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.render('produto/listar', {lista: lista});
    }

    async vitrineView(req, res) {
        let produto = new ProdutoModel();
        let listaProdutos = await produto.listarProdutos();

        res.render('vitrine', { layout: 'layout', produtos: listaProdutos });
    }

    async obter(req, res) {
        let id = req.params.produto;
        let produto = new ProdutoModel();
        produto = await produto.buscarProduto(id);

        res.send({produtoEncontrado: produto});
    }
}

module.exports = ProdutoController;