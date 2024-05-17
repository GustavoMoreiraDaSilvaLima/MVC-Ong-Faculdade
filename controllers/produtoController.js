const ProdutoModel = require("../models/produtoModel");

class produtoController {

    async vitrineView(req, res) {
        let produto = new ProdutoModel();
        let listaProdutos = await produto.listarProdutos();

        res.render('vitrine', { layout: 'vitrine', produtos: listaProdutos });
    }

}
module.exports = produtoController;