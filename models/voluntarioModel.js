const Database = require("../utils/database");

const banco = new Database();

class Voluntario {
    #CPF;
    #nome;
    #email;
    #telefone;
    #desc;

    constructor(CPF, nome, email, telefone, desc) {
        this.#CPF = CPF;
        this.#nome = nome;
        this.#email = email;
        this.#telefone = telefone;
        this.#desc = desc;
    }

    // Getters
    getCPF() {
        return this.#CPF;
    }

    getNome() {
        return this.#nome;
    }

    getEmail() {
        return this.#email;
    }

    getTelefone() {
        return this.#telefone;
    }

    getDesc() {
        return this.#desc;
    }

    // Setters
    setCPF(CPF) {
        this.#CPF = CPF;
    }

    setNome(nome) {
        this.#nome = nome;
    }

    setEmail(email) {
        this.#email = email;
    }

    setTelefone(telefone) {
        this.#telefone = telefone;
    }

    setDesc(desc) {
        this.#desc = desc;
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
        let sql = "insert into ONG_VOLUNTARIO (ONG_VOLUNTARIO_EMAIL, ONG_VOLUNTARIO_NOME, ONG_VOLUNTARIO_TELEFONE, " +
        "ONG_VOLUNTARIO_DESC, ONG_VOLUNTARIO_CPF) values (?,?,?,?,?)";

        let valores = [this.#email, this.#nome, this.#telefone, this.#desc, this.#CPF];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async alterar_no_model() {
        const sql = "UPDATE ONG_VOLUNTARIO SET ONG_VOLUNTARIO_EMAIL = ?, ONG_VOLUNTARIO_NOME = ?, "+
        "ONG_VOLUNTARIO_TELEFONE = ?, ONG_VOLUNTARIO_DESC = ? WHERE ONG_VOLUNTARIO_CPF = ?";

        let valores = [this.#email, this.#nome, this.#telefone, this.#desc, this.#CPF];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar_no_model(){
        const sql = `DELETE FROM ONG_VOLUNTARIO WHERE ONG_VOLUNTARIO_CPF = ?;`

        let valores = [this.#CPF];

        let result = await banco.ExecutaComandoNonQuery(sql, valores)

        return result
    }
}

module.exports = Voluntario;