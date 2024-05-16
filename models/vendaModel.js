const Database = require("../utils/database");

const banco = new Database();

class vendaModel{
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
    get CupomVenda() {
        return this.#cupom_venda;
    }

    get IdUsu() {
        return this.#id_usu;
    }

    get IdProd() {
        return this.#id_prod;
    }

    get QuantidadeVenda() {
        return this.#quantidade_venda;
    }

    get ValorUniVendaProd() {
        return this.#valorUni_venda_prod;
    }

    get StatusVenda(){
        return this.#status_venda;
    }

    // Setters
    set CupomVenda(cupom_venda) {
        this.#cupom_venda = cupom_venda;
    }

    set IdUsu(id_usu) {
        this.#id_usu = id_usu;
    }

    set IdProd(id_prod) {
        this.#id_prod = id_prod;
    }

    set QuantidadeVenda(quantidade_venda) {
        this.#quantidade_venda = quantidade_venda;
    }

    set ValorUniVendaProd(valorUni_venda_prod) {
        this.#valorUni_venda_prod = valorUni_venda_prod;
    }

    set StatusVenda(status){
        this.#status_venda = status;
    }

    async listarVenda(){
        
    }

    async cadastrar_alterarVenda(){

    }
    //Intenção, obter o cupom completo da venda, com valor total, itens e quantidades
    async obterCupomCompleto(cupom){

    }

}

module.exports = vendaModel;
