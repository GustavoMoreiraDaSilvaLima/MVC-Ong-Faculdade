const Database = require("../db/database");

const banco = new Database();

class formasPagamentoModel {
  #pagamento_id;
  #pagamento_nome; //VARCHAR
  #pagamento_tipo; // int
  constructor(id, nome, tipo) {
    this.#pagamento_id = id;
    this.#pagamento_nome = nome;
    this.#pagamento_tipo = tipo;
  }

  get pagamento_id() {
    return this.#pagamento_id;
  }
  set pagamento_id(id) {
    this.#pagamento_id = id;
  }

  get pagamento_nome() {
    return this.#pagamento_nome;
  }
  set pagamento_nome(nome) {
    this.#pagamento_nome = nome;
  }

  get pagamento_tipo() {
    return this.#pagamento_tipo;
  }
  set pagamento_tipo(tipo) {
    this.#pagamento_tipo = tipo;
  }

  async listar() {
    let sql = `select * from tb_formas_pagamento`;

    let valores = [];

    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];

    for (let i = 0; i < rows.length; i++) {
      lista.push(
        new formasPagamentoModel(
          rows[i]["pagamento_id"],
          rows[i]["pagamento_nome"],
          rows[i]["pagamento_tipo"]
        )
      );
    }
    return lista;
  }
  toJSON() {
    return {
      id: this.#pagamento_id,
      nome: this.#pagamento_nome,
    };
  }
}

module.exports = formasPagamentoModel;
