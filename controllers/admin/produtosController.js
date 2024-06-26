const ProdutoModel = require("../../models/produtoModel");
const MarcaModel = require("../../models/MarcaModel");
const CategoriaModel = require("../../models/CategoriaModel");
const fs = require("fs");

let solucao = 0;

class ProdutoController {

  
  async listarView(req, res) {
    let prod = new ProdutoModel();
    let lista = await prod.listarProdutos();
    let marca = new MarcaModel();
    let listaMarca = await marca.listarMarcas();
    let categoria = new CategoriaModel();
    let listaCate = await categoria.listarCategorias();
    res.render("admin/produto/adminProduto", {
      lista: lista,
      listaCate: listaCate,
      listaMarca: listaMarca,
      layout: "adminLayout",
    });
  }

  async Filtracao(req, res) {
    try {
      const { nome, tipoPreco, categorias, marcas, quantiaMin, quantiaMax } =
        req.body;

      let prod = new ProdutoModel();
      let lista = await prod.filtrarAvancado(
        nome,
        tipoPreco,
        categorias,
        marcas,
        quantiaMin,
        quantiaMax
      );


      const transform = (produto) => {
        return {
          produtoId: produto.produtoId,
          produtoCodigo: produto.produtoCodigo,
          produtoNome: produto.produtoNome,
          produtoQuantidade: produto.produtoQuantidade,
          categoriaId: produto.categoriaId,
          categoriaNome: produto.categoriaNome,
          produtoValor: produto.produtoValor,
          produtoImagem: produto.imagem,
          marcaId: produto.marcaId,
          marcaNome: produto.marcaNome,
        };
      };

      let listaTransformada = lista.map(transform);


      let marca = new MarcaModel();
      let listaMarca = await marca.listarMarcas();
      let categoria = new CategoriaModel();
      let listaCate = await categoria.listarCategorias();

      res.json({
        lista: listaTransformada,
        listaMarca: listaMarca,
        listaCate: listaCate,
      });
    } catch (error) {
      console.error("Erro ao filtrar produtos:", error);
      res.status(500).json({ error: "Erro ao filtrar produtos." });
    }
  }

  async AtualizarLista(req,res){
      let prod = new ProdutoModel();
      let lista = await prod.listarProdutos();
      res.send({lista : lista});
  }

  async excluirProduto(req, res) {
    var ok = true;
    if (req.body.codigo != "") {
      let produto = new ProdutoModel();
      ok = await produto.excluir(req.body.codigo);
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

  async cadastrarProduto(req, res) {
    var ok = true;
    if (
      req.body.codigo != "" &&
      req.body.nome != "" &&
      req.body.quantidade != "" &&
      req.body.quantidade != "0" &&
      req.body.marca != "0" &&
      req.body.categoria != "0" &&
      req.body.valor > 0
    ) {
      let arquivo = req.file != null ? req.file.filename : null;
      let produto = new ProdutoModel(
        0,
        req.body.codigo,
        req.body.nome,
        req.body.quantidade,
        req.body.categoria,
        req.body.marca,
        "",
        "",
        arquivo,
        req.body.valor
      );

      ok = await produto.gravar();
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

  async alterarView(req, res) {
    if ((solucao == 0 || solucao != req.params.id) && req.params.id > 0) {
      solucao = req.params.id;
    }
    let produto = new ProdutoModel();
    let marca = new MarcaModel();

    let categoria = new CategoriaModel();
    if (solucao != undefined && solucao != "") {
      produto = await produto.buscarProduto(solucao);
    }

    let listaMarca = await marca.listarMarcas();
    let listaCategoria = await categoria.listarCategorias();
    res.render("admin/produto/alterar", {
      produtoAlter: produto,
      listaMarcas: listaMarca,
      listaCategorias: listaCategoria,
      layout: "adminlayout",
    });
  }

  async alterarProduto(req, res) {
    debugger;
    var ok = true;
    if (
      req.body.codigo != "" &&
      req.body.nome != "" &&
      req.body.quantidade != "" &&
      req.body.quantidade != "0" &&
      req.body.marca != "0" &&
      req.body.categoria != "0" &&
      req.body.valor > 0
    ) {
      let produtoOld = new ProdutoModel();
      produtoOld = await produtoOld.buscarProduto(req.body.id);
      //apagar a imagem do produto se tiver uma nova imagem na alteração e se o antigo tiver imagem
      let imagem = null;
      //se o file tiver preenchido, significa que a imagem será alterada
      if (req.file != null) {
        imagem = req.file.filename;
        //se o meu produto já tiver uma imagem cadastrada, faço a deleção com o fs
        if (produtoOld.possuiImagem) {
          let imagemAntiga = produtoOld.imagem;
          fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntiga);
        }
      } else {
        //se não, a imagem antiga deve ser mantida, mas apenas se houver
        if (produtoOld.possuiImagem)
          imagem = produtoOld.imagem.toString().split("/").pop();
      }

      let produto = new ProdutoModel(
        req.body.id,
        req.body.codigo,
        req.body.nome,
        req.body.quantidade,
        req.body.categoria,
        req.body.marca,
        "",
        "",
        imagem,
        req.body.valor
      );
      ok = await produto.gravar();
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

  async cadastroView(req, res) {
    let listaMarcas = [];
    let listaCategorias = [];

    let marca = new MarcaModel();
    listaMarcas = await marca.listarMarcas();

    let categoria = new CategoriaModel();
    listaCategorias = await categoria.listarCategorias();

    res.render("admin/produto/cadastrarProduto", {
      listaMarcas: listaMarcas,
      listaCategorias: listaCategorias,
      layout: "adminLayout",
    });
  }

  async obter(req, res) {
    let id = req.params.produto;
    let produto = new ProdutoModel();
    produto = await produto.buscarProduto(id);

    res.send({ produtoEncontrado: produto });
  }

  async Listar(req, res) {
    let produto = new ProdutoModel();
    produto = await produto.listarProdutos();

    res.send({ item: produto });
  }
}

module.exports = ProdutoController;
