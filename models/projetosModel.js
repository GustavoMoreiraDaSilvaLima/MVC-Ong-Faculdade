const Database = require("../db/database");

const banco = new Database();

class projetoModel{

    #id_proj
    #nome_proj
    #desc_proj
    #finalidade_proj
    #local_proj
    #dia_hora_proj
    #status_proj // Concluido, a ser concluido, cancelado

    constructor(id, nome, desc, finalidade, local, dia_hora,status) {
        this.#id_proj = id;
        this.#nome_proj = nome;
        this.#desc_proj = desc;
        this.#finalidade_proj = finalidade;
        this.#local_proj = local;
        this.#dia_hora_proj = dia_hora;
        this.#status_proj = status;
    }

    // Getters
    get IdProj() {
        return this.#id_proj;
    }

    get NomeProj() {
        return this.#nome_proj;
    }

    get DescProj() {
        return this.#desc_proj;
    }

    get FinalidadeProj() {
        return this.#finalidade_proj;
    }

    get LocalProj() {
        return this.#local_proj;
    }

    get DiaHoraProj() {
        return this.#dia_hora_proj;
    }

    get StatusProj(){
        return this.#status_proj
    }

    // Setters
    set IdProj(id) {
        this.#id_proj = id;
    }

    set NomeProj(nome) {
        this.#nome_proj = nome;
    }

    set DescProj(desc) {
        this.#desc_proj = desc;
    }

    set FinalidadeProj(finalidade) {
        this.#finalidade_proj = finalidade;
    }

    set LocalProj(local) {
        this.#local_proj = local;
    }

    set DiaHoraProj(dia_hora) {
        this.#dia_hora_proj = dia_hora;
    }

    set StatusProj(status){
        this.#status_proj = status;
    }


    async obterIdProjeto(){
        
    }

    async listarProjetos(){

    }

    async adicionar_alterar_Projeto(){        //Pega o ID da class

    }

    async removerProjeto(){

    }
}

module.exports = projetoModel;