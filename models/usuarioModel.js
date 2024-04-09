const Database = require("../utils/database");

const banco = new Database();

class UsuarioModel {

    #usuarioId;
    #usuarioNome;
    #usuarioEmail;
    #usuarioSenha;
    #usuarioAtivo;
    #perfilId;
    //implementar getter e setter
    get usuarioId() {
        return this.#usuarioId;
    }
    set usuarioId(usuarioId) {
        this.#usuarioId = usuarioId
    }
    get usuarioNome() {
        return this.#usuarioNome;
    }
    set usuarioNome(usuarioNome) {
        this.#usuarioNome = usuarioNome;
    }

    get usuarioEmail() {
        return this.#usuarioEmail;
    }
    set usuarioEmail(usuarioEmail) {
        this.#usuarioEmail = usuarioEmail;
    }

    get usuarioSenha() {
        return this.#usuarioSenha;
    }

    set usuarioSenha(usuarioSenha) {
        this.#usuarioSenha = usuarioSenha;
    }
    get perfilId() {
        return this.#perfilId;
    }

    set perfilId(perfilId){
        this.#perfilId = perfilId;
    }

    get usuarioAtivo() {
        return this.#usuarioAtivo;
    }
    set usuarioAtivo(usuarioAtivo) {
        this.#usuarioAtivo = usuarioAtivo;
    }

    //implementar construtor
    constructor(usuarioId, usuarioNome, usuarioEmail, usuarioSenha, usuarioAtivo, perfilId) {
        this.#usuarioId = usuarioId;
        this.#usuarioNome = usuarioNome;
        this.#usuarioEmail = usuarioEmail;
        this.#usuarioSenha = usuarioSenha;
        this.#usuarioAtivo = usuarioAtivo;
        this.#perfilId = perfilId;
    }

    //implementar as funções para manipulação das informações no banco
    async listar() {

        let sql = "select * from tb_usuario";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new UsuarioModel(rows[i]["usu_id"], rows[i]["usu_nome"], rows[i]["usu_email"], rows[i]["usu_senha"], rows[i]["usu_ativo"], rows[i]["per_id"]));
        }
        return lista;
    }

    async cadastrar_no_model() {
        let sql = "insert into tb_usuario (usu_email, usu_nome, usu_senha, usu_ativo, per_id) values (?,?,?,?,?)";

        let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterar_no_model() {
        const sql = 'UPDATE tb_usuario SET usu_email = ?, usu_nome = ?, usu_senha = ?, usu_ativo = ?, per_id = ? WHERE usu_id = ?';

        let valores = [this.#usuarioEmail, this.#usuarioNome, this.#usuarioSenha, this.#usuarioAtivo, this.#perfilId, this.#usuarioId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar_no_model(){
        const sql = `DELETE FROM tb_usuario WHERE usu_id = ?;`

        let valores = [this.#usuarioId];

        let result = await banco.ExecutaComandoNonQuery(sql, valores)

        return result
    }
}

module.exports = UsuarioModel;