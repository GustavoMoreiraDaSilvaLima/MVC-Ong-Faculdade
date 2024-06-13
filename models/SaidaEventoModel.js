const Database = require("../db/database");

const banco = new Database();

class SaidaEventoModel {
    #saida_id
    #saida_patrimonio_id
    #saida_produto_id
    #saida_quantidade
    #saida_evento_id
    #saida_img_prod
    #saida_img_patri
    #saida_evento_data

    constructor(saida_id, saida_patrimonio_id, saida_produto_id, saida_quantidade, saida_evento_id, img_prod, data, img_patri) {
        this.#saida_id = saida_id;
        this.#saida_patrimonio_id = saida_patrimonio_id;
        this.#saida_produto_id = saida_produto_id;
        this.#saida_quantidade = saida_quantidade;
        this.#saida_evento_id = saida_evento_id;
        this.#saida_img_prod = img_prod;
        this.#saida_img_patri = img_patri
        this.#saida_evento_data = data;
    }


    get SaidaImgProd() {
        return this.#saida_img_prod;
    }

    get SaidaImgPatri() {
        return this.#saida_img_patri;
    }

    // Getter para saida_id
    get SaidaId() {
        return this.#saida_id;
    }

    // Setter para saida_id
    set SaidaId(saida_id) {
        this.#saida_id = saida_id;
    }

    // Getter para saida_patrimonio_id
    get SaidaPatrimonioId() {
        return this.#saida_patrimonio_id;
    }

    // Setter para saida_patrimonio_id
    set SaidaPatrimonioId(saida_patrimonio_id) {
        this.#saida_patrimonio_id = saida_patrimonio_id;
    }

    // Getter para saida_produto_id
    get SaidaProdutoId() {
        return this.#saida_produto_id;
    }

    // Setter para saida_produto_id
    set SaidaProdutoId(saida_produto_id) {
        this.#saida_produto_id = saida_produto_id;
    }

    set SaidaImgProd(img) {
        this.#saida_img_prod = img;
    }
    set SaidaImgPatri(img) {
        this.#saida_img_patri = img;
    }

    // Getter para saida_quantidade
    get SaidaQuantidade() {
        return this.#saida_quantidade;
    }

    // Setter para saida_quantidade
    set SaidaQuantidade(saida_quantidade) {
        this.#saida_quantidade = saida_quantidade;
    }

    // Getter para saida_evento_id
    get SaidaEventoId() {
        return this.#saida_evento_id;
    }

    // Setter para saida_evento_id
    set SaidaEventoId(saida_evento_id) {
        this.#saida_evento_id = saida_evento_id;
    }

    async ExibirSaidaPatrimonio(){
        let sql = `select s.saida_id, s.saida_quantidade, s.saida_evento_id, patri.ONG_PATRIMONIO_NOME,patri.ONG_PATRIMONIO_IMG from tb_saida_evento s 
        INNER JOIN ONG_PATRIMONIOS patri ON patri.ONG_PATRIMONIO_ID = s.saida_patrimonio_id;`

        let valores = [this.#saida_evento_id];

        let lista = [];

        let rows = await banco.ExecutaComando(sql, valores);

        for (let i = 0; i < rows.length; i++) {
            let imagem = ''
            let row = rows[i];
            if (row["ONG_PATRIMONIO_IMG"] != null) {
                imagem = global.CAMINHO_IMG_BROWSER + row["ONG_PATRIMONIO_IMG"];
            } else {
                imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
            }

            lista.push(new SaidaEventoModel(row["saida_id"], row["ONG_PATRIMONIO_NOME"], 0, row['saida_quantidade'], row['saida_evento_id'], 0, 0, imagem));
        }

        return lista.length == 0? null : lista;


    }
    async ExibirSaidaProduto(){
        let sql = `select s.saida_id, s.saida_quantidade, s.saida_evento_id, prod.prd_nome, prod.prd_imagem from tb_saida_evento s 
        INNER JOIN tb_produto prod ON prod.prd_id = s.saida_produto_id where saida_evento_id = ?; `;

        let valores = [this.#saida_evento_id];

        let lista = [];

        let rows = await banco.ExecutaComando(sql, valores);

        //Buscar os produtos
        for (let i = 0; i < rows.length; i++) {
            let imagem = '';
            let row = rows[i];
            if (row["prd_imagem"] != null) {
                imagem = global.CAMINHO_IMG_BROWSER + row["prd_imagem"];
            } else {
                imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
            }
            
            lista.push(new SaidaEventoModel(row["saida_id"], 0, row['prd_nome'], row['saida_quantidade'], row['saida_evento_id'], imagem, 0, 0));
        }

        return lista.length == 0? null : lista;
    }

}

module.exports = SaidaEventoModel