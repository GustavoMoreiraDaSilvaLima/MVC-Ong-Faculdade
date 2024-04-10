const Database = require("../utils/database");

const banco = new Database();
class doacaoModel{
    #doa_id
    #doa_tipo
    #doa_data
    #doa_nome
    #doa_valor
    #doa_status
    constructor(id,tipo,data,nome,valor,status){
        this.#doa_id = id;
        this.#doa_tipo = tipo;
        this.#doa_data = data;
        this.#doa_nome = nome;
        this.#doa_valor = valor;
        this.#doa_status = status;
    }
    doacao_inserir_excluir(){
        
    }
    doacao_atualizar(){
        
    }
    doacao_exibir(){

    }
}
module.exports = doacaoModel;