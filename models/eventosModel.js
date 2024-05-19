const Database = require("../db/database");

const banco = new Database();

class eventosModel {
    #codigo_even
    #inicio_even
    #dia_even
    #duracao_even
    #local_even

    constructor(codigo, inicio, dia, duracao, local) {
        this.#codigo_even = codigo;
        this.#inicio_even = inicio;
        this.#dia_even = dia;
        this.#duracao_even = duracao;
        this.#local_even = local;
    }

    // Getters
    get CodigoEven() {
        return this.#codigo_even;
    }

    get InicioEven() {
        return this.#inicio_even;
    }

    get DiaEven() {
        return this.#dia_even;
    }

    get DuracaoEven() {
        return this.#duracao_even;
    }

    get LocalEven() {
        return this.#local_even;
    }

    // Setters
    set CodigoEven(codigo) {
        this.#codigo_even = codigo;
    }

    set InicioEven(inicio) {
        this.#inicio_even = inicio;
    }

    set DiaEven(dia) {
        this.#dia_even = dia;
    }

    set DuracaoEven(duracao) {
        this.#duracao_even = duracao;
    }

    set LocalEven(local) {
        this.#local_even = local;
    }


    async obterEvento(cod) {

    }

    async exibirEvento() {

    }

    async deletarEvento() {

    }

    async inclu_alterar_Evento() {

    }


}

module.exports = eventosModel;