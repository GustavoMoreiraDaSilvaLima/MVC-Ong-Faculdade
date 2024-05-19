const Database = require("../db/database");

const banco = new Database();

class Voluntario {
    CPF;
    nome;
    email;
    telefone;
    desc;

    constructor(CPF, nome, email, telefone, desc) {
        this.CPF = CPF;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.desc = desc;
    }

    // Getters
    getCPF() {
        return this.CPF;
    }

    getNome() {
        return this.nome;
    }

    getEmail() {
        return this.email;
    }

    getTelefone() {
        return this.telefone;
    }

    getDesc() {
        return this.desc;
    }

    // Setters
    setCPF(CPF) {
        this.CPF = CPF;
    }

    setNome(nome) {
        this.nome = nome;
    }

    setEmail(email) {
        this.email = email;
    }

    setTelefone(telefone) {
        this.telefone = telefone;
    }

    setDesc(desc) {
        this.desc = desc;
    }


    //implementar as funções para manipulação das informações no banco
    async listar() {

        let sql = "select * from ONG_VOLUNTARIO ORDER BY ONG_VOLUNTARIO_NOME asc";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new Voluntario(rows[i]["ONG_VOLUNTARIO_CPF"], rows[i]["ONG_VOLUNTARIO_NOME"], rows[i]["ONG_VOLUNTARIO_EMAIL"], rows[i]["ONG_VOLUNTARIO_TELEFONE"]));
        } 
        
        return lista;
    }

    async cadastrar_no_model() {
        let sql = "INSERT INTO ONG_VOLUNTARIO (ONG_VOLUNTARIO_EMAIL, ONG_VOLUNTARIO_NOME, ONG_VOLUNTARIO_TELEFONE, ONG_VOLUNTARIO_DESC, ONG_VOLUNTARIO_CPF) VALUES (?,?,?,?,?)";
        let valores = [this.email, this.nome, this.telefone, this.desc, this.CPF];
    
        try {
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return "Erro: CPF já cadastrado";
            } else {
                // Outros erros
                return "Erro:" + error.message;
            }
        }
    }
    

    async alterar_no_model() {
        const sql = "UPDATE ONG_VOLUNTARIO SET ONG_VOLUNTARIO_EMAIL = ?, ONG_VOLUNTARIO_NOME = ?, "+
        "ONG_VOLUNTARIO_TELEFONE = ?, ONG_VOLUNTARIO_DESC = ? WHERE ONG_VOLUNTARIO_CPF = ?";

        let valores = [this.email, this.nome, this.telefone, this.desc, this.CPF];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar_no_model(){
        const sql = `DELETE FROM ONG_VOLUNTARIO WHERE ONG_VOLUNTARIO_CPF = ?;`

        let valores = [this.CPF];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = Voluntario;