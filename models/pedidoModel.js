const Database = require("../db/database");

const banco = new Database();

class PedidoModel {
  #pedidoId;
  #pedidoData;

  get pedidoId() {
    return this.#pedidoId;
  }
  set pedidoId(pedidoId) {
    this.#pedidoId = pedidoId;
  }

  get pedidoData() {
    return this.#pedidoData;
  }
  set pedidoData(pedidoData) {
    this.#pedidoData = pedidoData;
  }

  constructor(pedidoId, pedidoData) {
    this.#pedidoId = pedidoId;
    this.#pedidoData = pedidoData;
  }

  async listar() {
    try {
      let sql = `
        SELECT 
          p.ped_id, 
          p.ped_data, 
          p.nome, 
          p.endereco, 
          p.cpf, 
          p.cep,
          fp.pagamento_id AS forma_pagamento_id,
          fp.pagamento_nome AS forma_pagamento_nome
        FROM 
          tb_pedido p
          INNER JOIN tb_formas_pagamento fp ON p.pagamento_id = fp.pagamento_id
      `;

      let valores = [];

      let rows = await banco.ExecutaComando(sql, valores);

      return rows;
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      throw error;
    }
  }

  async gravar(nome, endereco, cpf, formaPagamento, cep) {
    try {
      let sql = "INSERT INTO tb_pedido (ped_data, nome, endereco, cpf, pagamento_id, cep) VALUES (NOW(), ?, ?, ?, ?, ?)";
      let valores = [nome, endereco, cpf, formaPagamento, cep];

      let result = await banco.ExecutaComandoLastInserted(sql, valores);

      return result;
    } catch (error) {
      console.error("Erro ao gravar pedido:", error);
      throw error;
    }
  }
}

module.exports = PedidoModel;
