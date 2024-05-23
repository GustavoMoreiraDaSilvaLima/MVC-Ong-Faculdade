const ProdutoModel = require("../../models/produtoModel");
const MarcaModel = require("../../models/MarcaModel");
const CategoriaModel = require("../../models/CategoriaModel");
const fs = require("fs");

let solucao = 0

class ProdutoController {

    async listarView(req, res) {
        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();
        res.render('admin/produto/adminProduto', {lista: lista});
    }

    async excluirProduto(req, res){
        var ok = true;
        if(req.body.codigo != "") {
            let produto = new ProdutoModel();
            ok = await produto.excluir(req.body.codigo);
        }
        else{
            ok = false;
        }

        res.send({ok: ok});
    }
    
    async cadastrarProduto(req, res){
        var ok = true;
        if(req.body.codigo != "" && req.body.nome != "" && 
        req.body.quantidade != "" && req.body.quantidade  != '0' && 
        req.body.marca != '0' && req.body.categoria  != '0' && req.body.valor > 0) {
            let arquivo = req.file != null ? req.file.filename : null;
            let produto = new ProdutoModel(0, req.body.codigo, 
                req.body.nome, req.body.quantidade, 
                req.body.categoria, req.body.marca, "", "", arquivo, req.body.valor);

            ok = await produto.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async alterarView(req, res){ 
        if((solucao == 0 || solucao != req.params.id) && req.params.id > 0){
            solucao = req.params.id
        }
        let produto = new ProdutoModel();
        let marca = new MarcaModel();
        
        let categoria = new CategoriaModel();
        if(solucao != undefined && solucao != ""){
            produto = await produto.buscarProduto(solucao);
        }

        let listaMarca = await marca.listarMarcas();
        let listaCategoria = await categoria.listarCategorias();
        res.render("admin/produto/alterar", {produtoAlter: produto, listaMarcas: listaMarca, listaCategorias: listaCategoria});
    }

    async alterarProduto(req, res) {
        debugger
        var ok = true;
        if(req.body.codigo != "" && req.body.nome != "" && req.body.quantidade != "" && req.body.quantidade  != '0' && req.body.marca != '0' && req.body.categoria  != '0' && req.body.valor > 0) {

            let produtoOld = new ProdutoModel();
            produtoOld = await produtoOld.buscarProduto(req.body.id);
            //apagar a imagem do produto se tiver uma nova imagem na alteração e se o antigo tiver imagem
            let imagem = null
            //se o file tiver preenchido, significa que a imagem será alterada
            if(req.file != null) {
                imagem = req.file.filename;
                //se o meu produto já tiver uma imagem cadastrada, faço a deleção com o fs
                if(produtoOld.possuiImagem) {
                    let imagemAntiga = produtoOld.imagem;
                    fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntiga);
                }
            }
            else{ //se não, a imagem antiga deve ser mantida, mas apenas se houver
                if(produtoOld.possuiImagem)
                    imagem = produtoOld.imagem.toString().split("/").pop();
            }

            let produto = new ProdutoModel(req.body.id, req.body.codigo, req.body.nome, req.body.quantidade, req.body.categoria, req.body.marca, "", "", imagem, req.body.valor);
            ok = await produto.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }

    async cadastroView(req, res) {

            let listaMarcas = [];
            let listaCategorias = [];

            let marca = new MarcaModel();
            listaMarcas = await marca.listarMarcas();

            let categoria = new CategoriaModel();
            listaCategorias = await categoria.listarCategorias();

        res.render('admin/produto/cadastrarProduto', { listaMarcas: listaMarcas, listaCategorias: listaCategorias });
    }

    async obter(req, res) {
        let id = req.params.produto;
        let produto = new ProdutoModel();
        produto = await produto.buscarProduto(id);

        res.send({produtoEncontrado: produto});
    }
}

module.exports = ProdutoController;