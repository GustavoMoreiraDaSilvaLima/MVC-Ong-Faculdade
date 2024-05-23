const Database = require("../db/database");

const banco = new Database();

class statusDoacaoModel {
    #status_doacao_id
    #status_doacao_nome

    constructor(id, nome) {
        this.#status_doacao_id = id;
        this.#status_doacao_nome = nome;
    }

    set status_doacao_id(id) { this.#status_doacao_id = id }
    get status_doacao_id() { return this.#status_doacao_id };

    set status_doacao_nome(nome) { this.#status_doacao_nome = nome }
    get status_doacao_nome() { return this.#status_doacao_nome };

    async listar() {
        let sql = "select * from tb_status_doacao";
        let valores = [];
        let rows = await banco.ExecutaComando(sql, valores);

        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new statusDoacaoModel(rows[i]["status_doacao_id"], rows[i]["status_doacao_nome"]));
        }
        return lista;
    }
}

module.exports = statusDoacaoModel;