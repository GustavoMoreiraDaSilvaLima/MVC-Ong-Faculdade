const Database = require("../db/database");

const banco = new Database();

class doacaoModel {
    #doa_id
    #doa_tipo
    #doa_data
    #doa_nome
    #doa_valor
    #doa_status
    get doa_id() { return this.#doa_id; }
    set doa_id(id) { this.#doa_id = id; }
    get doa_tipo() { return this.#doa_tipo; }
    set doa_tipo(tipo) { this.#doa_tipo = tipo; }
    get doa_data() { return this.#doa_data; }
    set doa_data(data) { this.#doa_data = data; }
    get doa_nome() { return this.#doa_nome; }
    set doa_nome(nome) { this.#doa_nome = nome; }
    get doa_valor() { return this.#doa_valor; }
    set doa_valor(valor) { this.#doa_valor = valor; }
    get doa_status() { return this.#doa_status; }
    set doa_status(status) { this.#doa_status = status; }


    constructor(id, tipo, data, nome, valor, status) {
        this.#doa_id = id;
        this.#doa_tipo = tipo;
        this.#doa_data = data;
        this.#doa_nome = nome;
        this.#doa_valor = valor;
        this.#doa_status = status;
    }
    async doacao_inserir_atualizar() {
        if (this.#doa_id == 0) {
            let sql = "insert into tb_doacao (doa_id,doa_tipo,doa_data,doa_nome,doa_valor,doa_status) values (?,?,?,?,?,?)";

            let valores = [this.#doa_id, this.#doa_tipo, this.#doa_data, this.#doa_nome, this.#doa_valor, this.#doa_status];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update tb_doacao set doa_status = ?, doa_nome = ?, doa_tipo = ?,doa_valor = ? where doa_id = ?";
            let valores = [this.#doa_status, this.#doa_nome, this.#doa_tipo, this.#doa_valor, this.#doa_id];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }
    async obter(id) {
        let sql = "select * from tb_doacao where doa_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new doacaoModel(row["doa_id"], row["doa_tipo"], row["doa_data"], row["doa_nome"], row["doa_valor"], row["doa_status"]);
        }

        return null;

    }
    /*SELECT *
FROM usuarios
LIMIT 10 OFFSET 10;*/
    async doacao_listar(intervalo = 0) {
        let sql = '';
        let valores = [];
        if (intervalo == 0) {
            sql = "select * from tb_doacao order by doa_id DESC limit 10";

        } else {
            sql = "select * from tb_doacao order by doa_id DESC limit 10 OFFSET ?";
            valores = [intervalo];
        }


        let rows = await banco.ExecutaComando(sql, valores);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new doacaoModel(rows[i]["doa_id"], rows[i]["doa_tipo"], rows[i]["doa_data"], rows[i]["doa_nome"], rows[i]["doa_valor"], rows[i]["doa_status"]));
        }
        return lista;
    }

    async excluir(id) {
        let sql = "delete from tb_doacao where doa_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
    toJSON() {
        return {
            "id": this.#doa_id,
            "nome": this.#doa_nome,
            "tipo": this.#doa_tipo,
            "status": this.doa_status,
            "data": this.#doa_data,
            "valor": this.#doa_valor
        }
    }
}
module.exports = doacaoModel;