const projetosModel = require("../../models/projetosModel");

class ProjetosController {
  async ProjetosView(req, res) {
    res.render(`admin/adminEmDesenvolvimento`, {
      layout: `admin/adminEmDesenvolvimento`,
    });
  }

  adicionarProjetoView(req, res) {}

  async adicionarProjeto(req, res) {}

  async editarProjetoView(req, res) {}

  async editarProjeto(req, res) {}

  async excluirProjeto(req, res) {}
}

module.exports = ProjetosController;
