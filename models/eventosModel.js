const Database = require("../db/database");
const UtilData = require("../utils/data");

const banco = new Database();

class eventosModel {
  #evento_id;
  #evento_nome;
  #evento_descricao;
  #evento_inicio;
  #evento_data;
  #evento_duracao;
  #evento_local;
  #possuiImagem;
  #evento_imagem;
  #evento_saida;
  #evento_status;

  constructor(
    codigo,
    nome,
    desc,
    inicio,
    dia,
    duracao,
    local,
    imagem,
    saida,
    status = "Gerado"
  ) {
    this.#evento_id = codigo;
    this.#evento_nome = nome;
    this.#evento_descricao = desc;
    this.#evento_inicio = inicio;
    this.#evento_data = dia;
    this.#evento_duracao = duracao;
    this.#evento_local = local;
    this.#evento_imagem = imagem;
    this.#evento_saida = saida;
    this.#evento_status = status;
  }

  // Getters
  get evento_id() {
    return this.#evento_id;
  }
  get evento_nome() {
    return this.#evento_nome;
  }
  get evento_descricao() {
    return this.#evento_descricao;
  }
  get evento_inicio() {
    return this.#evento_inicio;
  }
  get evento_data() {
    return this.#evento_data;
  }
  get evento_duracao() {
    return this.#evento_duracao;
  }
  get evento_local() {
    return this.#evento_local;
  }
  get possuiImagem() {
    return this.#possuiImagem;
  }
  get evento_imagem() {
    return this.#evento_imagem;
  }
  get evento_saida() {
    return this.#evento_saida;
  }
  get evento_status() {
    return this.#evento_status;
  }

  // Setters
  set evento_id(codigo) {
    this.#evento_id = codigo;
  }
  set evento_nome(nome) {
    this.#evento_nome = nome;
  }
  set evento_descricao(desc) {
    this.#evento_descricao = desc;
  }
  set evento_inicio(inicio) {
    this.#evento_inicio = inicio;
  }
  set evento_data(dia) {
    this.#evento_data = dia;
  }
  set evento_duracao(duracao) {
    this.#evento_duracao = duracao;
  }
  set evento_local(local) {
    this.#evento_local = local;
  }
  set possuiImagem(opcao) {
    this.#possuiImagem = opcao;
  }
  set evento_imagem(imagem) {
    this.#evento_imagem = imagem;
  }
  set evento_saida(saida) {
    this.#evento_saida = saida;
  }
  set evento_status(status) {
    this.#evento_status = status;
  }

  async obterEvento(id) {
    let sql = "select * from tb_evento where evento_id = ?";
    let valores = [id];

    let rows = await banco.ExecutaComando(sql, valores);

    let evento = "";

    if (rows.length > 0) {
      let row = rows[0];

      evento = new eventosModel(
        row["evento_id"],
        row["evento_nome"],
        row["evento_descricao"],
        row["evento_inicio"],
        row["evento_data"],
        row["evento_duracao"],
        row["evento_local"],
        "",
        "",
        row["evento_status"]
      );
      if (row["evento_imagem"] != null) {
        evento.evento_imagem = global.CAMINHO_IMG_EVENTO + row["evento_imagem"];
        evento.possuiImagem = true;
      } else {
        evento.evento_imagem = global.CAMINHO_IMG_EVENTO + "sem-foto.jpeg"; //conferir a foto sem foto
        evento.possuiImagem = false;
      }
    }

    return evento;
  }

  async exibirEvento() {
    let sql = `select * from tb_evento where evento_status != "CANCELADO" order by evento_data asc`;
    let rows = await banco.ExecutaComando(sql);

    let listaRetorno = [];

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        let imagem = "";

        if (row["evento_imagem"] != null) {
          imagem = global.CAMINHO_IMG_EVENTO + row["evento_imagem"];
        } else {
          imagem = global.CAMINHO_IMG_EVENTO + "sem-foto.jpeg"; 
        }

        listaRetorno.push(
          new eventosModel(
            row["evento_id"],
            row["evento_nome"],
            row["evento_descricao"],
            row["evento_inicio"],
            row["evento_data"],
            row["evento_duracao"],
            row["evento_local"],
            imagem,
            "",
            row["evento_status"]
          )
        );
      }
    }
    return listaRetorno;
  }

  async deletarEvento(id) {
    let sql = "delete from tb_evento where evento_id = ?";
    let valores = [id];

    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async inclu_alterar_Evento() {
    if (this.evento_id == 0) {
      let sql =
        "insert into tb_evento (evento_nome, evento_descricao, evento_local, evento_inicio, evento_data, evento_duracao, evento_imagem, evento_status) values(?, ?, ?, ?, ?, ?, ?, ?)";
      let valores = [
        this.#evento_nome,
        this.#evento_descricao,
        this.#evento_local,
        this.#evento_inicio,
        this.#evento_data,
        this.#evento_duracao,
        this.#evento_imagem,
        this.#evento_status,
      ];

      return await banco.ExecutaComandoNonQuery(sql, valores);
    } else {
      let sql =
        "update tb_evento set evento_nome = ?, evento_descricao = ?, evento_local = ?, evento_inicio = ?, evento_data = ?, evento_duracao = ?, evento_imagem = ?, evento_status = ? where evento_id = ?";
      let valores = [
        this.#evento_nome,
        this.#evento_descricao,
        this.#evento_local,
        this.#evento_inicio,
        this.#evento_data,
        this.#evento_duracao,
        this.#evento_imagem,
        this.#evento_status,
        this.#evento_id,
      ];

      return (await banco.ExecutaComandoNonQuery(sql, valores)) > 0;
    }
  }

  async RegistrarSaidaEvento(id, idItem, quantidade, tipo) {
    let Evento = await this.obterEvento(id);
    let resultado = [];
    if (tipo == "produto") {
      for (let i = 0; i < idItem.length; i++) {
        let sql = `insert into tb_saida_evento (saida_evento_id,saida_produto_id,saida_quantidade,saida_evento_data) values (?,?,?,?)`;
        let formatarData = new UtilData();
        formatarData = formatarData.formatarData(Evento.evento_data);
        Evento.evento_data = formatarData;

        let valores = [
          Evento.evento_id,
          idItem[i],
          quantidade[i],
          Evento.evento_data,
        ];

        resultado[i] = await banco.ExecutaComandoNonQuery(sql, valores);
      }
      let ListaConfirma = [];
      for (let i = 0; i < resultado.length; i++) {
        if (resultado[i] == true) {
          ListaConfirma.push(resultado[i]);
        }
      }
      return ListaConfirma.length == resultado.length;
    } else if (tipo == "patrimonio") {
      for (let i = 0; i < idItem.length; i++) {
        let sql = `insert into tb_saida_evento (saida_evento_id,saida_patrimonio_id,saida_quantidade,saida_evento_data) values (?,?,?,?)`;
        let formatarData = new UtilData();
        formatarData = formatarData.formatarData(Evento.evento_data);
        Evento.evento_data = formatarData;
        let valores = [
          Evento.evento_id,
          idItem[i],
          quantidade[i],
          Evento.evento_data,
        ];
        resultado[i] = await banco.ExecutaComandoNonQuery(sql, valores);
      }
      let ListaConfirma = [];
      for (let i = 0; i < resultado.length; i++) {
        if (resultado[i] == true) {
          ListaConfirma.push(resultado[i]);
        }
      }
      return ListaConfirma.length == resultado.length;
    } else {
      return false;
    }
  }

  async VerificarSaida(id) {
    let sql = "select * from tb_saida_evento where saida_evento_id = ?";
    let valores = [id];
    let result = await banco.ExecutaComando(sql, valores);
    //Quando for maior que zero é porque achou, no caso true
    return result;
  }

  async Filtros(filtro) {
    let sql = `select * from tb_evento`
    let valores = [];

    if (filtro.length > 1) {
      //Verifica para aplicar filtros
      for (let i = 0; i < filtro.length; i += 2) {

        if (filtro[i] == "Cancelado") {
          if (i == 0) {
            sql += " where evento_status = 'CANCELADO'";
          } else {
            sql += " or evento_status = 'CANCELADO'";
          }
        } else if (filtro[i] == "Finalizado") {
          if (i == 0) {
            sql += " where evento_status = 'FINALIZADO'";
          } else {
            sql += " or evento_status = 'FINALIZADO'";
          }

        } else if (filtro[i] == "DataMaior") {
          if (i == 0) {
            sql += " where evento_data >= ?";
          } else {
            sql += " and evento_data >= ?";
          }     
          valores.push(filtro[i + 1]);
        } else if (filtro[i] == "Proximos") {
          if (i == 0) {
            sql += " where evento_data >= ?";
          } else {
            sql += " and evento_data >= ?";
          }
          valores.push(filtro[i + 1]);
        } else {
          //Quando não há selecionados
        }
      }
    } else {
      sql += " where evento_status != 'CANCELADO' and evento_status != 'FINALIZADO'"
    }

    sql += " order by evento_data asc"
    //Else para que???


    let rows = await banco.ExecutaComando(sql, valores);

    let listaRetorno = [];

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        let imagem = "";

        if (row["evento_imagem"] != null) {
          imagem = global.CAMINHO_IMG_EVENTO + row["evento_imagem"];
        } else {
          imagem = global.CAMINHO_IMG_EVENTO + "sem-foto.jpeg"; //conferir a foto sem foto
        }

        listaRetorno.push(new eventosModel(row["evento_id"], row["evento_nome"], row["evento_descricao"], row["evento_inicio"], row["evento_data"], row["evento_duracao"], row["evento_local"], imagem, "", row["evento_status"]));
      }
    }
    return listaRetorno;
  }

  async CancelarEvento(id) {
    let sql = "update tb_evento set evento_status = 'CANCELADO' where evento_id = ?;";
    let valores = [id];

    let result = await banco.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  toJSON() {
    return {
      evento_id: this.#evento_id,
      evento_nome: this.#evento_nome,
      evento_descricao: this.#evento_descricao,
      evento_local: this.#evento_local,
      evento_data: this.#evento_data,
      evento_inicio: this.#evento_inicio,
      evento_duracao: this.#evento_duracao,
      evento_imagem: this.#evento_imagem,
      evento_saida: this.#evento_saida,
      evento_status: this.#evento_status,
    };
  }
}

module.exports = eventosModel;
