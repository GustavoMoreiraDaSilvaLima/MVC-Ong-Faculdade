const Database = require("../db/database");

const banco = new Database();

class patrimonioModel{
    #id_patri     //Chave Primário
    #nome_patri
    #dataAquisicao_patri
    #desc_patri
    #status_patri //Caso o patrimonio seja destruido ou quebrado irá ser informado no Status

    constructor(id, nome, dataAquisicao, desc, status) {
        this.#id_patri = id;
        this.#nome_patri = nome;
        this.#dataAquisicao_patri = dataAquisicao;
        this.#desc_patri = desc;
        this.#status_patri = status;
    }

    // Getters
    get IdPatri() {
        return this.#id_patri;
    }

    get NomePatri() {
        return this.#nome_patri;
    }

    get DataAquisicaoPatri() {
        return this.#dataAquisicao_patri;
    }

    get DescPatri() {
        return this.#desc_patri;
    }

    get StatusPatri() {
        return this.#status_patri;
    }

    // Setters
    set IdPatri(id) {
        this.#id_patri = id;
    }

    set NomePatri(nome) {
        this.#nome_patri = nome;
    }

    set DataAquisicaoPatri(dataAquisicao) {
        this.#dataAquisicao_patri = dataAquisicao;
    }

    set DescPatri(desc) {
        this.#desc_patri = desc;
    }

    set StatusPatri(status) {
        this.#status_patri = status;
    }
    async obterPatrimonio(id) {

    }
    async listarPatrimonio(){

    }

    async inclu_alterar_Patrimonio() {

    }


    //Sem Excluir, seria o alterar, incluir no alterar o Status
}

module.exports = patrimonioModel;