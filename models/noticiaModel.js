const Database = require("../db/database");
const moment = require('moment');

const banco = new Database();
class noticiaModel {
  ONG_NOTICIA_ID;
  ONG_NOTICIA_TITULO;
  ONG_NOTICIA_DESCRICAO;
  ONG_NOTICIA_CONTEUDO;
  ONG_NOTICIA_EDITADO;
  ONG_NOTICIA_ULTIMA_ALTERACAO;
  ONG_NOTICIA_ADMINISTRADOR_CPF;
  ONG_NOTICIA_IMG;
  posssuiImagem;
  constructor(id, titulo, desc, conteudo, img, editado, alterado, noticia_adm_cpf, possui) {
    this.ONG_NOTICIA_ID = id;
    this.ONG_NOTICIA_TITULO = titulo;
    this.ONG_NOTICIA_DESCRICAO = desc;
    this.ONG_NOTICIA_CONTEUDO = conteudo;
    this.ONG_NOTICIA_IMG = img;
    this.ONG_NOTICIA_EDITADO = editado;
    this.ONG_NOTICIA_ULTIMA_ALTERACAO = alterado;
    this.ONG_NOTICIA_ADMINISTRADOR_CPF = noticia_adm_cpf;
    this.posssuiImagem = possui;
  }


  async noticia_inserir_atualizar() {
    debugger;
    if (this.ONG_NOTICIA_ID == 0) {
      let sql =
        "insert into ONG_NOTICIA (ONG_NOTICIA_TITULO, ONG_NOTICIA_DESCRICAO,ONG_NOTICIA_CONTEUDO, ONG_NOTICIA_EDITADO, ONG_NOTICIA_ULTIMA_ALTERACAO, ONG_NOTICIA_IMG) values (?,?,?,?,?,?)";

        let data = moment()
        let dataFormatada = data.format('YYYY-MM-DD HH:mm:ss');

      let valores = [
        this.ONG_NOTICIA_TITULO,
        this.ONG_NOTICIA_DESCRICAO,
        this.ONG_NOTICIA_CONTEUDO,
        0,
        dataFormatada,
        this.ONG_NOTICIA_IMG
      ];

      let result = await banco.ExecutaComandoNonQuery(sql, valores);

      return result;
    } else {
      let sql =
        "update ONG_NOTICIA SET ONG_NOTICIA_TITULO = ?, ONG_NOTICIA_DESCRICAO = ?,ONG_NOTICIA_CONTEUDO = ?,ONG_NOTICIA_EDITADO = ?, ONG_NOTICIA_ULTIMA_ALTERACAO = ?, ONG_NOTICIA_IMG = ?  where ONG_NOTICIA_ID = ?";
      
        let data = moment()
        let dataFormatada = data.format('YYYY-MM-DD HH:mm:ss');

        let valores = [
        this.ONG_NOTICIA_TITULO,
        this.ONG_NOTICIA_DESCRICAO,
        this.ONG_NOTICIA_CONTEUDO,
        1,
        dataFormatada,
        this.ONG_NOTICIA_IMG,
        this.ONG_NOTICIA_ID,
      ];

      let result = await banco.ExecutaComandoNonQuery(sql, valores);

      return result;
    }
  }

  noticia_atualizar() {}

  async noticia_exibir() {
    let sql = "select * from ONG_NOTICIA";

    let rows = await banco.ExecutaComando(sql);
    let lista = [];

    for (let i = 0; i < rows.length; i++) {

      let imagem = "";
      let possui
      if (rows[i]["ONG_NOTICIA_IMG"] != null) {
        imagem = global.CAMINHO_IMG_NOTICIAS +  rows[i]["ONG_NOTICIA_IMG"];
        possui = true
      } else {
        imagem = global.CAMINHO_IMG_NOTICIAS + "sem-foto.png";
        possui = false
      }

      lista.push(
        new noticiaModel(
          rows[i]["ONG_NOTICIA_ID"],
          rows[i]["ONG_NOTICIA_TITULO"],
          rows[i]["ONG_NOTICIA_DESCRICAO"],
          rows[i]["ONG_NOTICIA_CONTEUDO"],
          imagem,
          rows[i]["ONG_NOTICIA_EDITADO"],
          rows[i]["ONG_NOTICIA_ULTIMA_ALTERACAO"],
          0,
          possui
        )
      );
    }
    return lista;
  }

  async noticia_exibir_epsc(id) {
    let sql = "select * from ONG_NOTICIA where ONG_NOTICIA_ID = ?";

    let value = [id];

    let rows = await banco.ExecutaComando(sql, value);

    if (rows.length > 0) {
      let row = rows[0];
      let imagem = "";
      let possui
      if (row["ONG_NOTICIA_IMG"] != null) {
        imagem = global.CAMINHO_IMG_NOTICIAS +  row["ONG_NOTICIA_IMG"];
        possui = true
      } else {
        imagem = global.CAMINHO_IMG_NOTICIAS + "sem-foto.png";
        possui = false
      }



      return new noticiaModel(
        row["ONG_NOTICIA_ID"],
        row["ONG_NOTICIA_TITULO"],
        row["ONG_NOTICIA_DESCRICAO"],
        row["ONG_NOTICIA_CONTEUDO"],
        imagem,
        row["ONG_NOTICIA_EDITADO"],
        row["ONG_NOTICIA_ULTIMA_ALTERACAO"],
        0,
        possui
      );
    }

    return null;
  }
  
  async excluir(ONG_NOTICIA_ID) {
    let sql = "delete from ONG_NOTICIA where ONG_NOTICIA_ID = ?";
    let valores = [ONG_NOTICIA_ID];

    var result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }
}
module.exports = noticiaModel;
