const PedidoItemModel = require("../models/pedidoItemModel");
const PedidoModel = require("../models/pedidoModel");
const ProdutoModel = require("../models/produtoModel");

class PedidoController {
  


  async gravar(req, res) {
    if (req.body != null) {
      let { nome, endereco, cpf, formaPagamento, listaCarrinho } = req.body;

      if (!listaCarrinho || listaCarrinho.length === 0) {
        res.send({ ok: false, msg: "carrinho vazio!" });
        return;
      }

      let listaProdutos = [];
      //validação de estoque
      let listaValidacao = [];
      for (let i = 0; i < listaCarrinho.length; i++) {
        let produtoId = listaCarrinho[i].produtoId;
        let quantidade = listaCarrinho[i].quantidade;
        let produto = new ProdutoModel();
        if ((await produto.validarEstoque(produtoId, quantidade)) == false) {
          listaValidacao.push(produtoId);
        }
      }

      if (listaValidacao.length == 0) {
        //prosseguir com a gravação
        let pedido = new PedidoModel();

        // Gravar pedido com os novos dados
        let pedidoId = await pedido.gravar(
          nome,
          endereco,
          cpf,
          formaPagamento
        );

        let produto = new ProdutoModel();
        //gerar os itens do pedido
        for (let i = 0; i < listaCarrinho.length; i++) {
          let pedidoItem = new PedidoItemModel();

          pedidoItem.pedidoItemQuantidade = listaCarrinho[i].quantidade;
          pedidoItem.pedidoId = pedidoId;
          pedidoItem.produtoId = listaCarrinho[i].produtoId;

          produto = await produto.buscarProduto(listaCarrinho[i].produtoId);

          pedidoItem.pedidoItemValor = produto.produtoValor;
          pedidoItem.pedidoItemValorTotal =
            pedidoItem.pedidoItemQuantidade * pedidoItem.pedidoItemValor;
          await pedidoItem.gravar();
          await pedidoItem.atualizarEstoque(
            pedidoItem.produtoId,
            pedidoItem.pedidoItemQuantidade
          );
        }

        res.send({ ok: true, msg: "Pedido realizado!" });
      } else {
        res.send({
          ok: false,
          msg: "Erro durante a validação de estoque",
          lista: listaValidacao,
        });
      }
    } else {
      res.send({ ok: false, msg: "carrinho vazio!" });
    }
  }
  

}

module.exports = PedidoController;
