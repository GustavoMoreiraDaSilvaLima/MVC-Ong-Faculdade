const Database = require("../db/database");

const banco = new Database();

class PatrimonioModel {
  #ONG_PATRIMONIO_ID; // Chave Primária
  #ONG_PATRIMONIO_CODITEM;
  #ONG_PATRIMONIO_NOME;
  #ONG_PATRIMONIO_DESCRICAO;
  #ONG_PATRIMONIO_QUANTIDADE;
  #ONG_PATRIMONIO_STATUS;
  #ONG_PATRIMONIO_IMG;
  #posssuiImagem;

  constructor(id, coditem, nome, descricao, quantidade, status, imagem, possui) {
    this.#ONG_PATRIMONIO_ID = id;
    this.#ONG_PATRIMONIO_CODITEM = coditem;
    this.#ONG_PATRIMONIO_NOME = nome;
    this.#ONG_PATRIMONIO_DESCRICAO = descricao;
    this.#ONG_PATRIMONIO_QUANTIDADE = quantidade;
    this.#ONG_PATRIMONIO_STATUS = status;
    this.#ONG_PATRIMONIO_IMG = imagem;
    this.#posssuiImagem = possui;
  }
  // Getters
  get posssuiImagem() {
    return this.#posssuiImagem;
  }
  get ONG_PATRIMONIO_ID() {
    return this.#ONG_PATRIMONIO_ID;
  }

  get ONG_PATRIMONIO_CODITEM() {
    return this.#ONG_PATRIMONIO_CODITEM;
  }

  get ONG_PATRIMONIO_NOME() {
    return this.#ONG_PATRIMONIO_NOME;
  }

  get ONG_PATRIMONIO_DESCRICAO() {
    return this.#ONG_PATRIMONIO_DESCRICAO;
  }

  get ONG_PATRIMONIO_QUANTIDADE() {
    return this.#ONG_PATRIMONIO_QUANTIDADE;
  }

  get ONG_PATRIMONIO_STATUS() {
    return this.#ONG_PATRIMONIO_STATUS;
  }

  get ONG_PATRIMONIO_IMG() {
    return this.#ONG_PATRIMONIO_IMG;
  }

  // Setters
  set ONG_PATRIMONIO_ID(id) {
    this.#ONG_PATRIMONIO_ID = id;
  }

  set ONG_PATRIMONIO_CODITEM(coditem) {
    this.#ONG_PATRIMONIO_CODITEM = coditem;
  }

  set posssuiImagem(opcao) {
    this.#posssuiImagem = opcao;
  }

  set ONG_PATRIMONIO_NOME(nome) {
    this.#ONG_PATRIMONIO_NOME = nome;
  }

  set ONG_PATRIMONIO_DESCRICAO(descricao) {
    this.#ONG_PATRIMONIO_DESCRICAO = descricao;
  }

  set ONG_PATRIMONIO_QUANTIDADE(quantidade) {
    this.#ONG_PATRIMONIO_QUANTIDADE = quantidade;
  }

  set ONG_PATRIMONIO_STATUS(status) {
    this.#ONG_PATRIMONIO_STATUS = status;
  }

  set ONG_PATRIMONIO_IMG(imagem) {
    this.#ONG_PATRIMONIO_IMG = imagem;
  }

  // Métodos assíncronos
  async obterPatrimonio(id) {
    let sql = "SELECT * FROM ONG_PATRIMONIOS WHERE ONG_PATRIMONIO_ID = ?";
    let valores = [id];
    let rows = await banco.ExecutaComando(sql, valores);

    let patrimonio;

    if (rows.length > 0) {
      let row = rows[0];
      patrimonio = new PatrimonioModel(
        row["ONG_PATRIMONIO_ID"],
        row["ONG_PATRIMONIO_CODITEM"],
        row["ONG_PATRIMONIO_NOME"],
        row["ONG_PATRIMONIO_DESCRICAO"],
        row["ONG_PATRIMONIO_QUANTIDADE"],
        row["ONG_PATRIMONIO_STATUS"],
      );
      if (row["ONG_PATRIMONIO_IMG"] != null) {
        patrimonio.ONG_PATRIMONIO_IMG = row["ONG_PATRIMONIO_IMG"];
        patrimonio.posssuiImagem = true;
      } else {
        patrimonio.ONG_PATRIMONIO_IMG = global.CAMINHO_IMG_EVENTO + "sem-foto.png";
        patrimonio.posssuiImagem = false;
      }
    }
    return patrimonio;
  }


  async exibirPatrimonio() {
    let sql = "SELECT * FROM ONG_PATRIMONIOS";
    var rows = await banco.ExecutaComando(sql);

    let listaRetorno = [];

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        var row = rows[i];

        let imagem = "";
        if (row["ONG_PATRIMONIO_IMG"] != null) {
          imagem = global.CAMINHO_IMG_BROWSER + row["ONG_PATRIMONIO_IMG"];
        } else {
          imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
        }

        listaRetorno.push(
          new PatrimonioModel(
            row["ONG_PATRIMONIO_ID"],
            row["ONG_PATRIMONIO_CODITEM"],
            row["ONG_PATRIMONIO_NOME"],
            row["ONG_PATRIMONIO_DESCRICAO"],
            row["ONG_PATRIMONIO_QUANTIDADE"],
            row["ONG_PATRIMONIO_STATUS"],
            imagem
          )
        );
      }
    }
    return listaRetorno;
  }

  async atualizarPatrimonio() {
    if (this.#ONG_PATRIMONIO_ID == 0) {
      let sql =
        "INSERT INTO ONG_PATRIMONIOS (ONG_PATRIMONIO_CODITEM, ONG_PATRIMONIO_NOME, ONG_PATRIMONIO_DESCRICAO, ONG_PATRIMONIO_QUANTIDADE, ONG_PATRIMONIO_STATUS, ONG_PATRIMONIO_IMG) VALUES (?,?,?,?,?,?)";
      let valores = [
        this.#ONG_PATRIMONIO_CODITEM,
        this.#ONG_PATRIMONIO_NOME,
        this.#ONG_PATRIMONIO_DESCRICAO,
        this.#ONG_PATRIMONIO_QUANTIDADE,
        this.#ONG_PATRIMONIO_STATUS,
        this.#ONG_PATRIMONIO_IMG,

      ];
      let resultado = await banco.ExecutaComandoNonQuery(sql, valores);
      return resultado;
    } else {
      let sql =
        "UPDATE ONG_PATRIMONIOS SET ONG_PATRIMONIO_CODITEM = ?, ONG_PATRIMONIO_NOME = ?, ONG_PATRIMONIO_DESCRICAO = ?, ONG_PATRIMONIO_QUANTIDADE = ?, ONG_PATRIMONIO_STATUS = ?, ONG_PATRIMONIO_IMG = ? WHERE ONG_PATRIMONIO_ID = ?";
      let valores = [
        this.#ONG_PATRIMONIO_CODITEM,
        this.#ONG_PATRIMONIO_NOME,
        this.#ONG_PATRIMONIO_DESCRICAO,
        this.#ONG_PATRIMONIO_QUANTIDADE,
        this.#ONG_PATRIMONIO_STATUS,
        this.#ONG_PATRIMONIO_IMG,
        this.#ONG_PATRIMONIO_ID,
      ];
      let resultado = await banco.ExecutaComandoNonQuery(sql, valores);
      return resultado;
    }
  }

  async excluirPatrimonio(ONG_PATRIMONIO_ID) {
    let sql = "DELETE FROM ONG_PATRIMONIOS WHERE ONG_PATRIMONIO_ID = ?";
    let valores = [ONG_PATRIMONIO_ID];
    let resultado = await banco.ExecutaComandoNonQuery(sql, valores);
    return resultado;
  }

  async validarEstoque(id, quantidade) {
    let sql = "select * from ONG_PATRIMONIOS where ONG_PATRIMONIO_ID = ? and ONG_PATRIMONIO_QUANTIDADE >= ?";
    let valores = [id, quantidade];

    let rows = await banco.ExecutaComando(sql, valores);

    return rows.length > 0;
  }

  async RetirarEstoqueSaidaEvento(id, quantidade) {
    let resultado = []
    for (let i = 0; i < id.length; i++) {
      let sql = "update ONG_PATRIMONIOS set ONG_PATRIMONIO_QUANTIDADE = ONG_PATRIMONIO_QUANTIDADE - ? where ONG_PATRIMONIO_ID = ?"
      let valores = [quantidade[i], id[i]];
      resultado[i] = await banco.ExecutaComandoNonQuery(sql, valores)
    }
    let ListaConfirma = [];
    for (let i = 0; i < resultado.length; i++) {
      if (resultado[i] == true) {
        ListaConfirma.push(resultado[i]);
      }
    }

    return ListaConfirma.length == resultado.length;
  }

  toJSON() {
    return {
      patrimonioid: this.#ONG_PATRIMONIO_ID,
      patrimonioNome: this.#ONG_PATRIMONIO_NOME,
      patrimonioQuantidade: this.#ONG_PATRIMONIO_QUANTIDADE,
      patrimonioStatus: this.#ONG_PATRIMONIO_STATUS,
      patrimonioDescricao: this.#ONG_PATRIMONIO_DESCRICAO,
      patrimonioImg: this.#ONG_PATRIMONIO_IMG,
    };
  }
}

module.exports = PatrimonioModel;
