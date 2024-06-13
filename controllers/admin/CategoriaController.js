const CategoriaModel = require("../../models/CategoriaModel");

class CategoriaController {
  async listarView(req, res) {
    let cat = new CategoriaModel();
    let lista = await cat.listarCategorias();
    res.render("admin/adminCategoriaListar", {
      lista: lista,
      layout: "adminLayout",
    });
  }
}

module.exports = CategoriaController;
