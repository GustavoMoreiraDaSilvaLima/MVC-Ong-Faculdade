const Database = require("../db/database");

const banco = new Database();

class UsuarioModel {

    #usuario_id // Int
    #usuario_perfil // Int
    #usuario_status // Int
    #usuario_nome // VARCHAR
    #usuario_documento // VARCHAR
    #usuario_dataNasc // DATE
    #usuario_email
    #usuario_senha

    constructor(id = null, perfil, status, nome, documento, data, email, senha) {

        this.#usuario_id = id;
        this.#usuario_perfil = perfil;
        this.#usuario_status = status;
        this.#usuario_nome = nome;
        this.#usuario_documento = documento;
        this.#usuario_dataNasc = data;
        this.#usuario_email = email
        this.#usuario_senha = senha

    }

    get usuario_id() { return this.#usuario_id; }
    set usuario_id(id) { this.#usuario_id = id; }

    get usuario_perfil() { return this.#usuario_perfil; }
    set usuario_perfil(perfil) { this.#usuario_perfil = perfil; }

    get usuario_status() { return this.#usuario_status; }
    set usuario_status(status) { this.#usuario_status = status; }

    get usuario_nome() { return this.#usuario_nome; }
    set usuario_nome(nome) { this.#usuario_nome = nome; }

    get usuario_documento() { return this.#usuario_documento; }
    set usuario_documento(documento) { this.#usuario_documento = documento; }

    get usuario_dataNasc() { return this.#usuario_dataNasc; }
    set usuario_dataNasc(data) { this.#usuario_dataNasc = data; }

    get usuario_email() { return this.#usuario_email; }
    set usuario_email(email) { this.#usuario_email = email; }

    get usuario_senha() { return this.#usuario_senha; }
    set usuario_senha(senha) { this.#usuario_senha = senha; }

    async obterPorEmailSenha(email, senha) {
        let sql = "select * from tb_usuario where usuario_email = ? and usuario_senha = ?";

        let valores = [email, senha];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usuario_id"], row["usuario_perfil"], row["usuario_status"], row["usuario_nome"], row["usuario_documento"], row["usuario_dataNasc"], row["usuario_email"], row["usuario_senha"]);
        }

        return null;
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usuario_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["usuario_id"], row["usuario_perfil"], row["usuario_status"], row["usuario_nome"], row["usuario_documento"], row["usuario_dataNasc"], row["usuario_email"], row["usuario_senha"]);
        }

        return null;
    }

}

module.exports = UsuarioModel;
