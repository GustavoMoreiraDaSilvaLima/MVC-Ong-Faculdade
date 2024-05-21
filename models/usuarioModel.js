const Database = require("../db/database");

const banco = new Database();

class usuarioModel{
    
    #id_usu
    #nome_usu
    #tipo_usu
    #email_usu
    #senha_usu
    #CPF

    constructor(id_usu, nome_usu, tipo_usu, email_usu, senha_usu, CPF) {
        this.#id_usu = id_usu;
        this.#nome_usu = nome_usu;
        this.#tipo_usu = tipo_usu;
        this.#email_usu = email_usu;
        this.#senha_usu = senha_usu;
        this.#CPF = CPF;
    }

    // Getters
    get IdUsu() {
        return this.#id_usu;
    }

    get NomeUsu() {
        return this.#nome_usu;
    }

    get TipoUsu() {
        return this.#tipo_usu;
    }

    get EmailUsu() {
        return this.#email_usu;
    }

    get SenhaUsu() {
        return this.#senha_usu;
    }

    // Setters
    set IdUsu(id_usu) {
        this.#id_usu = id_usu;
    }

    set NomeUsu(nome_usu) {
        this.#nome_usu = nome_usu;
    }

    set TipoUsu(tipo_usu) {
        this.#tipo_usu = tipo_usu;
    }

    set EmailUsu(email_usu) {
        this.#email_usu = email_usu;
    }

    set SenhaUsu(senha_usu) {
        this.#senha_usu = senha_usu;
    }

    async obter(id){

    }

    async obterPorEmailSenha(email, senha){

    }
}

module.exports = usuarioModel;
