const patrimonioModel = require("../../models/patrimonioModel");
const PatrimonioModel = require("../../models/patrimonioModel");
const fs = require("fs");

class PatrimonioController {
  async patrimonioView(req, res) {
    let patrimonio = new PatrimonioModel();
    let lista = await patrimonio.exibirPatrimonio();
    res.render("admin/patrimonio/adminPatrimonio", {
      lista: lista,
      layout: "adminLayout",
    });
  }

  cadastrarPatrimonioView(req, res) {
    res.render("admin/patrimonio/adminCadastrar", { layout: "adminLayout" });
  }

  async cadastrarPatrimonioPost(req, res) {
    if (
      req.kbody.coditem != 0 &&
      req.body.nome != "" &&
      req.body.descricao != "" &&
      req.body.quantidade > 0 &&
      req.body.status != ""
    ) {
      let arquivo = req.file != null ? req.file.filename : null;
      let patrimonio = new PatrimonioModel(
        req.body.id,
        req.body.coditem,
        req.body.nome,
        req.body.descricao,
        req.body.quantidade,
        req.body.status,
        arquivo
      );
      let resultado = await patrimonio.atualizarPatrimonio();

      res.send({ ok: resultado, msg: "Patrimonio cadastrado!" });
    }
  }

  async EditarPatrimonioPost(req, res) {
    let ok = true;
    let msg = "";
    if (
      req.body.coditem != 0 &&
      req.body.nome != "" &&
      req.body.descricao != "" &&
      req.body.quantidade > 0 &&
      req.body.status != ""
    ) {
      let PatrimonioOld = new PatrimonioModel();
      PatrimonioOld = await PatrimonioOld.obterPatrimonio(req.body.id);
      let imagem = null;
      
      if (req.file != null) {
        imagem = req.file.filename;
        if (PatrimonioOld.posssuiImagem) {
          let imagemAntigo = PatrimonioOld.ONG_PATRIMONIO_IMG;
          fs.unlinkSync(global.RAIZ_PROJETO + "/public/img/produtos/" + imagemAntigo);
        }
      } 
      else {
        if (PatrimonioOld.posssuiImagem){
          imagem = PatrimonioOld.ONG_PATRIMONIO_IMG.toString().split("/").pop();
        }
      }
      
      let patrimonio = new PatrimonioModel(
        req.body.id,
        req.body.coditem,
        req.body.nome,
        req.body.descricao,
        req.body.quantidade,
        req.body.status,
        imagem
      );
      ok = await patrimonio.atualizarPatrimonio();
      msg = "Patrimonio Atualizado com sucesso";
    } else {
      ok = false;
      msg = "Erro ao atualizar patrimonio";
    }
    res.send({ ok: ok, msg: msg });
  }

  async editarPatrimonioView(req, res) {
    let id = req.params.id;
    let patrimonio = new PatrimonioModel();
    let obj = await patrimonio.obterPatrimonio(id);
    res.render("admin/patrimonio/adminEditar", {
      obj: obj,
      layout: "adminLayout",
    });
  }

  async editarPatrimonioPost(req, res) {
    // Implementar a lógica para editar um patrimônio
  }

  async excluirPatrimonio(req, res) {
    var ok = true;
    if (req.body.patrimonioId != "") {
      let patrimonio = new patrimonioModel();
      ok = await patrimonio.excluirPatrimonio(req.body.patrimonioId);
    } else {
      ok = false;
    }
    res.send({ ok: ok });
  }
  async exibirPatrimonioPost() {
    var ok = true;
    if (
      (req.body.id != "",
      req.body.coditem > 0,
      req.body.nome != "",
      req.body.descricao != "",
      req.body.quantidade > 0,
      req.body.status != "")
    ) {
    }
    let produto = new ProdutoModel(
      req.body.id,
      req.body.coditem,
      req.body.nome,
      req.body.descricao,
      req.body.quantidade,
      req.body.status
    );
    ok = await produto.cadastrarPatrimonioView();
  }
  async Listar(req, res) {
    let Patrimonio = new PatrimonioModel();
    Patrimonio = await Patrimonio.exibirPatrimonio();

    res.send({ item: Patrimonio });
  }
}



module.exports = PatrimonioController;
