const Database = require("../db/database");

const banco = new Database();

class vendaModel {
    #id_venda
    #id_usu
    #id_prod
    #id_envio
    #data_envio
    #data_compra
    #status_venda
    #quantidade

    constructor(id_venda, id_usu, id_prod, id_envio, data_envio, data_compra, status_venda, quantidade) {
        this.#id_venda = id_venda;
        this.#id_usu = id_usu;
        this.#id_prod = id_prod;
        this.#id_envio = id_envio;
        this.#data_envio = data_envio;
        this.#data_compra = data_compra;
        this.#status_venda = status_venda;
        this.#quantidade = quantidade;
    }

    // Getters
    get id_venda() {
        return this.#id_venda;
    }

    get IdUsu() {
        return this.#id_usu;
    }

    get IdProd() {
        return this.#id_prod;
    }

    get QuantidadeVenda() {
        return this.#quantidade;
    }

    get StatusVenda() {
        return this.#status_venda;
    }

    // Setters
    set id_venda(id_venda) {
        this.#id_venda = id_venda;
    }

    set IdUsu(id_usu) {
        this.#id_usu = id_usu;
    }

    set IdProd(id_prod) {
        this.#id_prod = id_prod;
    }

    set QuantidadeVenda(quantidade) {
        this.#quantidade = quantidade;
    }

    set StatusVenda(status) {
        this.#status_venda = status;
    }

    async listarVenda() {
        // Aqui você implementaria a lógica para listar as vendas no banco de dados
    }

    async cadastrar_alterarVenda() {
        // Aqui você implementaria a lógica para cadastrar ou alterar uma venda no banco de dados
    }

    // Intenção: obter o cupom completo da venda, com valor total, itens e quantidades
    async obterCupomCompleto(cupom) {
        // Aqui você implementaria a lógica para obter o cupom completo da venda com base no cupom fornecido
    }
}

module.exports = vendaModel;
