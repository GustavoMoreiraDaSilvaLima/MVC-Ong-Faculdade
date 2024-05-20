const Database = require("../db/database");

const banco = new Database();

class UsuarioModel {

    #usuario_id // Int
    #usuario_perfil // Int
    #usuario_status // Int
    #usuario_login // Int
    #usuario_nome // VARCHAR
    #usuario_cpf // VARCHAR
    #usuario_dataNasc // DATE

    constructor(id = null, perfil, status, login, nome, cpf, data) {

        this.#usuario_id = id;
        this.#usuario_perfil = perfil;
        this.#usuario_status = status;
        this.#usuario_login = login;
        this.#usuario_nome = nome;
        this.#usuario_cpf = cpf;
        this.#usuario_dataNasc = data;

    }

    get usuario_id() { return this.#usuario_id; }
    set usuario_id(id) { this.#usuario_id = id; }

    get usuario_perfil() { return this.#usuario_perfil; }
    set usuario_perfil(perfil) { this.#usuario_perfil = perfil; }

    get usuario_status() { return this.#usuario_status; }
    set usuario_status(status) { this.#usuario_status = status; }

    get usuario_login() { return this.#usuario_login; }
    set usuario_login(login) { this.#usuario_login = login; }

    get usuario_nome() { return this.#usuario_nome; }
    set usuario_nome(nome) { this.#usuario_nome = nome; }

    get usuario_cpf() { return this.#usuario_cpf; }
    set usuario_cpf(cpf) { this.#usuario_cpf = cpf; }

    get usuario_dataNasc() { return this.#usuario_dataNasc; }
    set usuario_dataNasc(data) { this.#usuario_dataNasc = data; }

    async acharPeloLogin(id) {
        let sql = "select * from tb_usuario where usuario_login = ?";
        let valores = [id];
        let rows = await banco.ExecutaComando(sql,valores);

        if(rows.length > 0){
            let row = rows[0]
            return new UsuarioModel(row["usuario_id"],row["usuario_perfil"],row["usuario_status"],row["usuario_login"],row["usuario_nome"],row["usuario_cpf"],row["usuario_dataNasc"]);
        }
        return null;
    }

}

module.exports = UsuarioModel;
