const Database = require("../db/database");

const banco = new Database();

class doacaocaoModel {
    #doacao_id
    #doacao_tipo
    #doacao_usuario
    #doacao_status
    #doacao_nome
    #doacao_valor
    #doacao_data

    get doacao_id() { return this.#doacao_id; }
    set doacao_id(id) { this.#doacao_id = id; }

    get doacao_tipo() { return this.#doacao_tipo; }
    set doacao_tipo(tipo) { this.#doacao_tipo = tipo; }

    set doacao_usuario(id) { this.#doacao_usuario = id }
    get doacao_usuario() { return this.#doacao_usuario }

    get doacao_data() { return this.#doacao_data; }
    set doacao_data(data) { this.#doacao_data = data; }

    get doacao_nome() { return this.#doacao_nome; }
    set doacao_nome(nome) { this.#doacao_nome = nome; }

    get doacao_valor() { return this.#doacao_valor; }
    set doacao_valor(valor) { this.#doacao_valor = valor; }

    get doacao_status() { return this.#doacao_status; }
    set doacao_status(status) { this.#doacao_status = status; }


    constructor(id, tipo, usuario, status, nome, valor, data) {
        this.#doacao_id = id;
        this.#doacao_tipo = tipo;
        this.#doacao_usuario = usuario;
        this.#doacao_status = status;
        this.#doacao_nome = nome;
        this.#doacao_valor = valor;
        this.#doacao_data = data;

    }
    async doacao_inserir_atualizar() {
        if (this.#doacao_id == 0) {
            let sql = "insert into tb_doacao (doacao_id,doacao_tipo,doacao_usuario,doacao_status,doacao_nome,doacao_valor,doacao_data) values (?,?,?,?,?,?,?)";

            let valores = [this.#doacao_id, this.#doacao_tipo, this.#doacao_usuario, this.#doacao_status, this.#doacao_nome, this.#doacao_valor, this.#doacao_data];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "update tb_doacao set doacao_status = ?, doacao_nome = ?, doacao_tipo = ?,doacao_valor = ?, doacao_usuario = ? where doacao_id = ?";
            let valores = [this.#doacao_status, this.#doacao_nome, this.#doacao_tipo, this.#doacao_valor, this.#doacao_usuario, this.#doacao_id];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }


    async obter(id) {
        let sql = "select * from tb_doacao where doacao_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new doacaocaoModel(row["doacao_id"], row["doacao_tipo"], row["doacao_usuario"], row["doacao_status"], row["doacao_nome"], row["doacao_valor"], row["doacao_data"]);
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
            sql = "select * from tb_doacao order by doacao_id DESC limit 10";

        } else if (intervalo == -99) {
            sql = `select * from tb_doacao order by doacao_id DESC`;
        } else {
            sql = "select * from tb_doacao order by doacao_id DESC limit 10 OFFSET ?";
            valores = [intervalo];
        }


        let rows = await banco.ExecutaComando(sql, valores);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            lista.push(new doacaocaoModel(row["doacao_id"], row["doacao_tipo"], row["doacao_usuario"], row["doacao_status"], row["doacao_nome"], row["doacao_valor"], row["doacao_data"]));
        }
        return lista;
    }

    async excluir(id) {
        let sql = "delete from tb_doacao where doacao_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
    toJSON() {
        return {
            "id": this.#doacao_id,
            "tipo": this.#doacao_tipo,
            "usuario": this.#doacao_usuario,
            "status": this.#doacao_status,
            "nome": this.#doacao_nome,
            "valor": this.#doacao_valor,
            "data": this.#doacao_data
        }
    }
}
module.exports = doacaocaoModel;