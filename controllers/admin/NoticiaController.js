const noticiaModel = require(`../../models/noticiaModel`);
const fs = require("fs");

class noticiaController {
  //Visualização especial para o ADM, layout de ADministrador lembrar de colocar
  async listarNoticias(req, res) {
    let noticia = new noticiaModel();
    let lista = await noticia.noticia_exibir();

    res.render("admin/noticias/adminNoticia", {
      lista: lista,
      layout: "adminLayout",
    });
  }

  /*//Ver Noticias/EXibir mais detalhamente             Pode melhorar e quando o ADM clicar para ver, aparecer a opção de editar
    async especNoticia(req,res){
        let noticia = new noticiaModel();
        let not = await noticia.noticia_exibir_epsc(req.params.id);
        res.render('noticia/noticia_esp', { not : not, layout : 'noticia/noticia_esp'})
    }
    */

  //Excluir uma noticia
  async excluirNoticia(req, res) {
    var ok = true;
    if (req.body.NoticiaId != "") {
      let noticia = new noticiaModel();
      ok = await noticia.excluir(req.body.NoticiaId);
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

  async adicionarNoticaView(req, res) {
    res.render("admin/noticias/adminCadastrar", { layout: "adminLayout" });
  }

  async adicionarNoticia(req, res) {
    if (
      (req.body.titulo != "", req.body.descricao != "", req.body.conteudo != "")
    ) {
      let arquivo = req.file != null ? req.file.filename : null;
      let noticia = new noticiaModel(
        0,
        req.body.titulo,
        req.body.descricao,
        req.body.conteudo,
        arquivo
      );
      let result = await noticia.noticia_inserir_atualizar();

      res.send({ ok: result });
    } else res.send({ ok: false });
  }

  async editarNoticiaView(req, res) {
    let id = req.params.id;
    let noticia = new noticiaModel();
    let lista = await noticia.noticia_exibir_epsc(id);
    res.render("admin/noticias/adminAlterar", {
      lista: lista,
      layout: "adminLayout",
    });
  }
  //Essa ou a de abrir a notica já vir para editar
  async editarNoticia(req, res) {
    if (
      (req.body.id != "",
      req.body.titulo != "",
      req.body.descricao != "",
      req.body.conteudo != "")
    ) {
      let NoticiaOld = new noticiaModel();
      NoticiaOld = await NoticiaOld.noticia_exibir_epsc(req.body.id);
      let imagem = null;

      if(req.file != null){
        imagem = req.file.filename;
        if(NoticiaOld.posssuiImagem){
          let imagemAntigo = NoticiaOld.ONG_NOTICIA_IMG;
          fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntigo);
        }
      }
      else{
        if(NoticiaOld.posssuiImagem){
          imagem = NoticiaOld.ONG_NOTICIA_IMG.toString().split("/").pop();
        }
      }
      let noticia = new noticiaModel(
        req.body.id,
        req.body.titulo,
        req.body.descricao,
        req.body.conteudo,
        imagem
      );
      let result = await noticia.noticia_inserir_atualizar();

      res.send({ ok: result });
    } else res.send({ ok: false });
    }
}

module.exports = noticiaController;
