const PedidoModel = require("../../models/pedidoModel");

class PedidoController {
  async listarView(req, res) {
    let pedido = new PedidoModel();
    let lista = await pedido.listar();
    res.render("admin/pedidos", {
      lista: lista,
      layout: "adminLayout",
    });
  }
}

module.exports = PedidoController;
