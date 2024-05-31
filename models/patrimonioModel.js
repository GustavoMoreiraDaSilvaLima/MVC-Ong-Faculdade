const Database = require("../db/database");

const banco = new Database();

class patrimonioModel{
    #ONG_PATRIMONIO_ID   //Chave Primário
    #ONG_PATRIMONIO_NOME
    #ONG_PATRIMONIO_DESCRICAO
    #ONG_PATRIMONIO_QUANTIDADE
    #ONG_PATRIMONIO_STATUS //Caso o patrimonio seja destruido ou quebrado irá ser informado no Status

    constructor(id, nome, descricao, quantidade, status) {
        this.#ONG_PATRIMONIO_ID = id;
        this.#ONG_PATRIMONIO_NOME = nome;
        this.#ONG_PATRIMONIO_DESCRICAO = descricao;
        this.#ONG_PATRIMONIO_QUANTIDADE = quantidade
        this.#ONG_PATRIMONIO_STATUS = status;
    }

    // Getters
    get ONG_PATRIMONIO_ID() {
        return this.#ONG_PATRIMONIO_ID;
    }

    get ONG_PATRIMONIO_NOME() {
        return this.#ONG_PATRIMONIO_NOME;
    }

    get ONG_PATRIMONIO_DESCRICAO() {
        return this.#ONG_PATRIMONIO_DESCRICAO;
    }

    get ONG_PATRIMONIO_QUANTIDADE() {
        return this.#ONG_PATRIMONIO_QUANTIDADE;
    }

    get ONG_PATRIMONIO_STATUS() {
        return this.#ONG_PATRIMONIO_STATUS;
    }

    //Setters
    set IdPatri(id) {
        this.#ONG_PATRIMONIO_ID = id;
    }

    set ONG_PATRIMONIO_NOME(nome) {
        this.#ONG_PATRIMONIO_NOME = nome;
    }

    set ONG_PATRIMONIO_DESCRICAO(descricao) {
        this.#ONG_PATRIMONIO_DESCRICAO = descricao;
    }

    set ONG_PATRIMONIO_STATUS(status) {
        this.#ONG_PATRIMONIO_STATUS = status;
    }
    async obterPatrimonio(id) {

    }
    async listarPatrimonio(){

    }

    async inclu_alterar_Patrimonio() {

    }


    //Sem Excluir, seria o alterar, incluir no alterar o Status

    async exibirPatrimonio(){
        let sql = "select * from ONG_PATRIMONIOS";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new patrimonioModel(rows[i]["ONG_PATRIMONIO_ID"], rows[i]["ONG_PATRIMONIO_NOME"], rows[i]["ONG_PATRIMONIO_DESCRICAO"], rows[i]["ONG_PATRIMONIO_QUANTIDADE"], rows[i]["ONG_PATRIMONIO_STATUS"], rows[i]["ONG_PATRIMONIO_IMG"]));
        }
        return lista;
    }

}

module.exports = patrimonioModel;


