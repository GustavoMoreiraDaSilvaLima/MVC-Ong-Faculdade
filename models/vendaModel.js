const Database = require("../utils/database");

const banco = new Database();

class vendaModel{
    #cupom_venda //PrimaryKey
    #id_usu //PrimaryKey
    #id_prod //PrimaryKey
    #quantidade_venda // quantidade de venda do produto
    #valorUni_venda_prod
    #status_venda


    constructor(cupom_venda, id_usu, id_prod, quantidade_venda, valorUni_venda_prod,status_venda) {
        this.#cupom_venda = cupom_venda;
        this.#id_usu = id_usu;
        this.#id_prod = id_prod;
        this.#quantidade_venda = quantidade_venda;
        this.#valorUni_venda_prod = valorUni_venda_prod;
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