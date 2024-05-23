const Database = require("../db/database");

const banco = new Database();

class tipoPagamentoModel {
    #pagamento_tipo_id
    #pagamento_tipo // VARCHAR
    constructor(id, nome, tipo) {
        this.#pagamento_tipo_id = id

        this.#pagamento_tipo = tipo

    }

    get pagamento_tipo_id() { return this.#pagamento_tipo_id }
    set pagamento_tipo_id(id) { this.#pagamento_tipo_id = id }


    get pagamento_tipo() { return this.#pagamento_tipo }
    set pagamento_tipo(tipo) { this.#pagamento_tipo = tipo }




}

module.exports = tipoPagamentoModel;