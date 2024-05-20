const Database = require("../db/database");

const banco = new Database();

class LoginModel {

    #login_id //Int
    #login_perfil //Int
    #login_usuario // Int
    #login_status // Int
    #login_email // Varchar
    #login_senha // Varchar

    constructor(id, perfil, usuario, status, email, senha) {
        this.#login_id = id;
        this.#login_perfil = perfil;
        this.#login_usuario = usuario;
        this.#login_status = status;
        this.#login_email = email;
        this.#login_senha = senha;
    }

    // Getters
    get login_id() { return this.#login_id; }
    get login_perfil() { return this.#login_perfil; }
    get login_usuario() { return this.#login_usuario; }
    get login_status() { return this.#login_status; }
    get login_email() { return this.#login_email; }
    get login_senha() { return this.#login_senha; }
    // Setters
    set login_id(id) { this.#login_id = id; }
    set login_perfil(perfil) { this.#login_perfil = perfil; }
    set login_usuario(usuario) { this.#login_usuario = usuario; }
    set login_status(status) { this.#login_status = status; }
    set login_email(email) { this.#login_email = email; }
    set login_senha(senha) { this.#login_senha = senha; }


    //Metodos
    async obterPorEmailSenha(email, senha) {
        let sql = "select * from tb_login where login_email = ? and login_senha = ?";

        let valores = [email, senha];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new LoginModel(row["login_id"], row["login_perfil"], row["login_usuario"], row["login_status"], row["login_email"], row["login_senha"]);
        }

        return null;
    }

    async obter(id) {
        let sql = "select * from tb_login where login_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let row = rows[0];
            return new UsuarioModel(row["login_id"], row["login_perfil"], row["login_usuario"], row["login_status"], row["login_email"], row["login_senha"]);
        }

        return null;
    }

}

module.exports = LoginModel;