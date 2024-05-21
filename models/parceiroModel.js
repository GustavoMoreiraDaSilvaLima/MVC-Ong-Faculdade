const Database = require("../db/database");

const banco = new Database();

class parceiroModel {
    #cnpj_parc
    #nome_fantasia_parc
    #endereco_parc
    #tipo_parc

    constructor(cnpj, nome_fantasia, endereco, tipo) {
        this.#cnpj_parc = cnpj;
        this.#nome_fantasia_parc = nome_fantasia;
        this.#endereco_parc = endereco;
        this.#tipo_parc = tipo;
    }

    // Getters

    get CnpjParc() {
        return this.#cnpj_parc;
    }

    get NomeFantasiaParc() {
        return this.#nome_fantasia_parc;
    }

    get EnderecoParc() {
        return this.#endereco_parc;
    }

    get TipoParc() {
        return this.#tipo_parc;
    }

    // Setters

    set CnpjParc(cnpj) {
        this.#cnpj_parc = cnpj;
    }

    set NomeFantasiaParc(nome_fantasia) {
        this.#nome_fantasia_parc = nome_fantasia;
    }

    set EnderecoParc(endereco) {
        this.#endereco_parc = endereco;
    }

    set TipoParc(tipo) {
        this.#tipo_parc = tipo;
    }


    async obterParceiro(cod) {

    }

    async exibirParceiro() {

    }

    async deletarParceiro() {

    }

    async inclu_alterar_Parceiro() {

    }
}

module.exports = parceiroModel;