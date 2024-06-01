const Database = require("../db/database");

const banco = new Database();

class eventosModel {
    #evento_id
    #evento_nome
    #evento_descricao
    #evento_inicio
    #evento_data
    #evento_duracao
    #evento_local
    #possuiImagem
    #evento_imagem
    #evento_saida

    constructor(codigo, nome, desc, inicio, dia, duracao, local, imagem, saida) {
        this.#evento_id = codigo;
        this.#evento_nome = nome;
        this.#evento_descricao = desc;
        this.#evento_inicio = inicio;
        this.#evento_data = dia;
        this.#evento_duracao = duracao;
        this.#evento_local = local;
        this.#evento_imagem = imagem;
        this.#evento_saida = saida;
    }

    // Getters
    get evento_id() { return this.#evento_id; }
    get evento_nome() { return this.#evento_nome; }
    get evento_descricao() { return this.#evento_descricao; }
    get evento_inicio() { return this.#evento_inicio; }
    get evento_data() { return this.#evento_data; }
    get evento_duracao() { return this.#evento_duracao; }
    get evento_local() { return this.#evento_local; }
    get possuiImagem() { return this.#possuiImagem; }
    get evento_imagem() { return this.#evento_imagem; }
    get evento_saida() { return this.#evento_saida; }

    // Setters
    set evento_id(codigo) { this.#evento_id = codigo; }
    set evento_nome(nome) { this.#evento_nome = nome; }
    set evento_descricao(desc) { this.#evento_descricao = desc; }
    set evento_inicio(inicio) { this.#evento_inicio = inicio; }
    set evento_data(dia) { this.#evento_data = dia; }
    set evento_duracao(duracao) { this.#evento_duracao = duracao; }
    set evento_local(local) { this.#evento_local = local; }
    set possuiImagem(opcao) { this.#possuiImagem = opcao; }
    set evento_imagem(imagem) { this.#evento_imagem = imagem; }
    set evento_saida(saida) { this.#evento_saida = saida; }


    async obterEvento(id) {
        let sql = "select * from where evento_id = ?";
        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        let evento = '';

        if (rows.length > 0) {
            let row = rows[0]


            if (row["evento_imagem"] != null) {
                imagem = global.CAMINHO_IMG_BROWSER + row["evento_imagem"];
            } else {
                imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";//conferir a foto sem foto
            }

            evento = new eventosModel(row["evento_id"], row["evento_nome"], row["evento_descricao"], row["evento_inicio"], row["evento_data"], row["evento_duracao"], row["evento_local"], imagem, row["evento_saida"]);



        }
    }

    async exibirEvento() {
        let sql = `select evento.*, saida.saida_id FROM tb_evento evento 
        INNER JOIN tb_saida_evento saida ON saida.saida_evento_id = evento.evento_id`;
        let rows = await banco.ExecutaComando(sql);

        let listaRetorno = [];

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];

                let imagem = "";

                if (row["evento_imagem"] != null) {
                    imagem = global.CAMINHO_IMG_BROWSER + row["evento_imagem"];
                } else {
                    imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";//conferir a foto sem foto
                }

                listaRetorno.push(new eventosModel(row["evento_id"], row["evento_nome"], row["evento_descricao"], row["evento_inicio"], row["evento_data"], row["evento_duracao"], row["evento_local"], imagem,row["evento_saida"]));
            }
        }
        return listaRetorno;
    }

    async deletarEvento(id) {

        let sql = "delete from tb_evento where evento_id = ?"
        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async inclu_alterar_Evento() {
        if (this.evento_id == 0) {

            let sql = "insert into tb_evento (evento_nome, evento_descricao, evento_local, evento_inicio, evento_data, evento_duracao, evento_imagem) values(?, ?, ?, ?, ?, ?, ?)";
            let valores = [this.#evento_nome, this.#evento_descricao, this.#evento_local, this.#evento_inicio, this.#evento_data, this.#evento_duracao, this.#evento_imagem];

            return await banco.ExecutaComandoNonQuery(sql, valores);
        } else {

            let sql = "update tb_evento set evento_nome = ?, evento_descricao = ?, evento_local = ?, evento_inicio = ?, evento_data = ?, evento_duracao = ?, evento_imagem = ?, evento_saida = ? where evento_id = ?"
            let valores = [this.#evento_nome, this.#evento_descricao, this.#evento_local, this.#evento_inicio, this.#evento_data, this.#evento_duracao, this.#evento_imagem, this.#evento_saida, this.#evento_id];

            return await banco.ExecutaComandoNonQuery(sql, valores) > 0;


        }

    }


}

module.exports = eventosModel;