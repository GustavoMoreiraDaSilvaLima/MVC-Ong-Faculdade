const Database = require("../db/database");

const banco = new Database();

class patrimonioModel {
    #ONG_PATRIMONIO_ID   //Chave Primário
    #ONG_PATRIMONIO_CODITEM
    #ONG_PATRIMONIO_NOME
    #ONG_PATRIMONIO_DESCRICAO
    #ONG_PATRIMONIO_QUANTIDADE
    #ONG_PATRIMONIO_STATUS
    #ONG_PATRIMONIO_IMAGEM //Caso o patrimonio seja destruido ou quebrado irá ser informado no Status
    #ONG_PATRIMONIO_IMG

    constructor(id, coditem, nome, descricao, quantidade, status, imagem) {
        this.#ONG_PATRIMONIO_ID = id;
        this.#ONG_PATRIMONIO_CODITEM = coditem;
        this.#ONG_PATRIMONIO_NOME = nome;
        this.#ONG_PATRIMONIO_DESCRICAO = descricao;
        this.#ONG_PATRIMONIO_QUANTIDADE = quantidade
        this.#ONG_PATRIMONIO_STATUS = status;
        this.#ONG_PATRIMONIO_IMAGEM = imagem;
    }

    // Getters
    get ONG_PATRIMONIO_ID() {
        return this.#ONG_PATRIMONIO_ID;
    }
    get ONG_PATRIMONIO_CODITEM() {
        return this.#ONG_PATRIMONIO_CODITEM;
    }

    get ONG_PATRIMONIO_NOME() {
        return this.#ONG_PATRIMONIO_NOME;
    }

    get ONG_PATRIMONIO_DESCRICAO() {
        return this.#ONG_PATRIMONIO_DESCRICAO;
    }

    get ONG_PATRIMONIO_QUANTIDADE() {
        return this.#ONG_PATRIMONIO_QUANTIDADE;
    }

    get ONG_PATRIMONIO_STATUS() {
        return this.#ONG_PATRIMONIO_STATUS;
    }
    get ONG_PATRIMONIO_IMAGEM() {
        return this.#ONG_PATRIMONIO_IMAGEM;
    }

    get ONG_PATRIMONIO_IMG() { return this.#ONG_PATRIMONIO_IMG; }

    //Setters
    set IdPatri(id) {
        this.#ONG_PATRIMONIO_ID = id;
    }
    set ONG_PATRIMONIO_CODITEM(coditem) {
        this.#ONG_PATRIMONIO_CODITEM = coditem;
    }

    set ONG_PATRIMONIO_NOME(nome) {
        this.#ONG_PATRIMONIO_NOME = nome;
    }

    set ONG_PATRIMONIO_DESCRICAO(descricao) {
        this.#ONG_PATRIMONIO_DESCRICAO = descricao;
    }

    set ONG_PATRIMONIO_STATUS(status) {
        this.#ONG_PATRIMONIO_STATUS = status;
    }
    set ONG_PATRIMONIO_IMAGEM(imagem) {
        this.#ONG_PATRIMONIO_IMAGEM = imagem;
    }
    async obterPatrimonio(id) {

    }
    async listarPatrimonio() {

    }

    async atualizarPatrimonio() {

        if(this.ONG_PATRIMONIO_ID == 0){
            let sql = "insert into ONG_PATRIMONIOS (ONG_PATRIMONIO_CODITEM, ONG_PATRIMONIO_NOME, ONG_PATRIMONIO_DESCRICAO, ONG_PATRIMONIO_QUANTIDADE, ONG_PATRIMONIO_STATUS) values (?,?,?,?,?)";
            let valores = [this.#ONG_PATRIMONIO_CODITEM, this.#ONG_PATRIMONIO_NOME, this.#ONG_PATRIMONIO_DESCRICAO, this.#ONG_PATRIMONIO_QUANTIDADE, this.#ONG_PATRIMONIO_STATUS];
            let resultado = await banco.ExecutaComandoNonQuery(sql,valores);

            return resultado;
        }

        


    async exibirPatrimonio() {
        let sql = "select * from ONG_PATRIMONIOS";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new patrimonioModel(rows[i]["ONG_PATRIMONIO_ID"], rows[i]["ONG_PATRIMONIO_CODITEM"], rows[i]["ONG_PATRIMONIO_NOME"], rows[i]["ONG_PATRIMONIO_DESCRICAO"], rows[i]["ONG_PATRIMONIO_QUANTIDADE"], rows[i]["ONG_PATRIMONIO_STATUS"]));
        }
        return lista;
    }

    async excluirPatrimonio(ONG_PATRIMONIO_ID) {

        let sql = "delete from ONG_PATRIMONIOS where ONG_PATRIMONIO_ID = ?";
        let valores = [ONG_PATRIMONIO_ID];

        var resultado = await banco.ExecutaComandoNonQuery(sql,valores);

        return resultado;

    }

}


module.exports = patrimonioModel;


