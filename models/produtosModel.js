const Database = require("../utils/database");

const banco = new Database();

class produtoModel{
    #id_prod //Chave Primaria
    #nome_prod
    #desc_prod
    #estoque_prod
    #valor_prod

    constructor(id, nome, desc, quantidade, valor) {
        this.#id_prod = id;
        this.#nome_prod = nome;
        this.#desc_prod = desc;
        this.#estoque_prod = quantidade;
        this.#valor_prod = valor;
    }

    // Getters
    get IdProd() {
        return this.#id_prod;
    }

    get NomeProd() {
        return this.#nome_prod;
    }

    get DescProd() {
        return this.#desc_prod;
    }

    get EstoqueProd() {
        return this.#estoque_prod;
    }

    get ValorProd() {
        return this.#valor_prod;
    }

    // Setters
    set IdProd(id) {
        this.#id_prod = id;
    }

    set NomeProd(nome) {
        this.#nome_prod = nome;
    }

    set DescProd(desc) {
        this.#desc_prod = desc;
    }

    set EstoqueProd(quantidade) {
        this.#estoque_prod = quantidade;
    }

    set ValorProd(valor) {
        this.#valor_prod = valor;
    }

    async obterProduto(id){

    }
    
    async retirarProduto(quant){ // Recebe a quantidade que foi vendido e retira do estoque

    }

    async incluir_alterar_Produto(){      //Inclussao envia 0 na model

    }
}

module.exports = produtoModel;