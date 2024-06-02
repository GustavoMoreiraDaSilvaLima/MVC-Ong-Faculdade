const Database = require('../db/database');

const conexao = new Database();
class ProdutoModel {

    #produtoId;
    #produtoCodigo;
    #produtoNome;
    #produtoQuantidade;
    #categoriaId;
    #categoriaNome;
    #marcaId;
    #marcaNome;
    #imagem;
    #produtoValor;
    #possuiImagem


    get produtoId() { return this.#produtoId; } set produtoId(produtoId) { this.#produtoId = produtoId; }
    get produtoCodigo() { return this.#produtoCodigo; } set produtoCodigo(produtoCodigo) { this.#produtoCodigo = produtoCodigo; }
    get produtoNome() { return this.#produtoNome; } set produtoNome(produtoNome) { this.#produtoNome = produtoNome; }
    get produtoQuantidade() { return this.#produtoQuantidade; } set produtoQuantidade(produtoQuantidade) { this.#produtoQuantidade = produtoQuantidade; }
    get categoriaId() { return this.#categoriaId; } set categoriaId(categoriaId) { this.#categoriaId = categoriaId; }
    get categoriaNome() { return this.#categoriaNome; } set categoriaNome(categoriaNome) { this.#categoriaNome = categoriaNome; }
    get marcaId() { return this.#marcaId; } set marcaId(marcaId) { this.#marcaId = marcaId; }
    get marcaNome() { return this.#marcaNome; } set marcaNome(marcaNome) { this.#marcaNome = marcaNome; }
    get imagem() { return this.#imagem; } set imagem(imagem) { this.#imagem = imagem; }
    get possuiImagem() { return this.#possuiImagem; } set possuiImagem(possuiImagem) { this.#possuiImagem = possuiImagem; }
    get produtoValor() { return this.#produtoValor; } set produtoValor(produtoValor) { this.#produtoValor = produtoValor; }



    constructor(produtoId, produtoCodigo, produtoNome, produtoQuantidade, categoriaId, marcaId, categoriaNome, marcaNome, imagem, produtoValor) {
        this.#produtoId = produtoId
        this.#produtoCodigo = produtoCodigo
        this.#produtoNome = produtoNome
        this.#produtoQuantidade = produtoQuantidade
        this.#categoriaId = categoriaId;
        this.#categoriaNome = categoriaNome;
        this.#marcaId = marcaId;
        this.#marcaNome = marcaNome;
        this.#imagem = imagem;
        this.#produtoValor = produtoValor;
    }


    async validarEstoque(produtoId, quantidade) {

        let sql = "select * from tb_produto where prd_id = ? and prd_quantidade >= ?";
        let valores = [produtoId, quantidade];

        let rows = await conexao.ExecutaComando(sql, valores);

        return rows.length > 0;
    }

    async excluir(codigo) {
        let sql = "delete from tb_produto where prd_id = ?"
        let valores = [codigo];

        var result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async gravar() {
        if (this.#produtoId == 0) {
            let sql = "insert into tb_produto (prd_cod, prd_nome, prd_quantidade, cat_id, mar_id, prd_imagem, prd_valor) values (?, ?, ?, ?, ?, ?, ?)";

            let valores = [this.#produtoCodigo, this.#produtoNome, this.#produtoQuantidade, this.#categoriaId, this.#marcaId, this.#imagem, this.#produtoValor];

            return await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else {
            //alterar
            let sql = "update tb_produto set prd_cod = ?, prd_nome =?, prd_quantidade= ?, cat_id = ?, mar_id = ?, prd_imagem = ?, prd_valor = ? where prd_id = ?";

            let valores = [this.#produtoCodigo, this.#produtoNome,
            this.#produtoQuantidade,
            this.#categoriaId,
            this.#marcaId, this.#imagem, this.#produtoValor, this.#produtoId];

            return await conexao.ExecutaComandoNonQuery(sql, valores) > 0;
        }
    }

    async buscarProduto(id) {
        let sql = `select * from tb_produto p 
                        inner join tb_marca m on p.mar_id = m.mar_id 
                        inner join tb_categoria c on p.cat_id = c.cat_id
                    where prd_id = ? order by prd_id`;
        let valores = [id];
        var rows = await conexao.ExecutaComando(sql, valores);

        let produto = null;

        if (rows.length > 0) {
            var row = rows[0];

            let imagem = "";

            produto = new ProdutoModel(row['prd_id'],
                row['prd_cod'], row['prd_nome'], row['prd_quantidade'],
                row['cat_id'], row['mar_id'], row["cat_nome"], row["mar_nome"], null, row["prd_valor"]);

            if (row["prd_imagem"] != null) {
                produto.imagem = global.CAMINHO_IMG_BROWSER + row["prd_imagem"];
                produto.possuiImagem = true;
            }
            else {
                produto.imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
                produto.possuiImagem = false;
            }

        }

        return produto;
    }

    async filtrarAvancado(nome, tipoPreco, categorias, marcas, quantiaMin, quantiaMax) {
        let query = `SELECT * FROM tb_produto p
                INNER JOIN tb_categoria c ON p.cat_id = c.cat_id
                INNER JOIN tb_marca m ON p.mar_id = m.mar_id
                WHERE 1=1`;
        let values = []
            if (nome !== undefined && nome !== '') {
                query += ' AND p.prd_nome LIKE " ? %"';
                values.push(nome)
            }

            if (categorias !== undefined && categorias.length > 0) {
                query += ' AND p.cat_id IN (?)';
                values.push(categorias.join(','))
            }
        
            if (marcas !== undefined && marcas.length > 0) {
                query += ' AND p.mar_id IN (?)';
                values.push(marcas.join(','))
            }
        
            if (quantiaMin !== undefined && quantiaMin !== '') {
                query += ' AND p.prd_quantidade >= ? ';
                values.push(quantiaMin)
            }
        
            if (quantiaMax !== undefined && quantiaMax !== '') {
                query += ' AND p.prd_quantidade <= ?' ;
                values.push(quantiaMax)
            }
                    
            if (tipoPreco !== undefined && tipoPreco !== '') {
                if (tipoPreco === 'ascendente') {
                    query += ' ORDER BY p.prd_valor ASC';
                } else if (tipoPreco === 'descendente') {
                    query += ' ORDER BY p.prd_valor DESC';
                }
            }
        
        try {
            var rows = await conexao.ExecutaComando(query, values);
    
            let listaRetorno = [];
    
            if(rows.length > 0){
                for(let i=0; i<rows.length; i++){
    
                    var row = rows[i];
    
                    let imagem = row["prd_imagem"] ? global.CAMINHO_IMG_BROWSER + row["prd_imagem"] : global.CAMINHO_IMG_BROWSER + "sem-foto.png";
    
                    listaRetorno.push(new ProdutoModel(row['prd_id'], 
                    row['prd_cod'], row['prd_nome'], row['prd_quantidade'], 
                    row['cat_id'], row['mar_id'], row['cat_nome'], row['mar_nome'], imagem, row["prd_valor"]));
                }
            }
            return listaRetorno;
        } catch (error) {
            // Lidar com erros
            console.error("Erro ao filtrar produtos:", error);
            throw error;
        }
    }
    

    async listarProdutos() {

        let sql = 'select * from tb_produto p inner join tb_categoria c on p.cat_id = c.cat_id inner join tb_marca m on p.mar_id = m.mar_id order by prd_id';

        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {

                var row = rows[i];

                let imagem = "";
                if (row["prd_imagem"] != null) {
                    imagem = global.CAMINHO_IMG_BROWSER + row["prd_imagem"];
                }
                else {
                    imagem = global.CAMINHO_IMG_BROWSER + "sem-foto.png";
                }

                listaRetorno.push(new ProdutoModel(row['prd_id'],
                    row['prd_cod'], row['prd_nome'], row['prd_quantidade'],
                    row['cat_id'], row['mar_id'], row['cat_nome'], row['mar_nome'], imagem, row["prd_valor"]));
            }
        }

        return listaRetorno;
    }

    async RetirarEstoqueSaidaEvento(id, quantidade) {
        let resultado = []
        for (let i = 0; i < id.length; i++) {
            let sql = "update tb_produto set prd_quantidade = prd_quantidade - ? where prd_id = ?"
            let valores = [quantidade[i], id[i]];
            resultado[i] = await conexao.ExecutaComandoNonQuery(sql, valores)
        }
        let ListaConfirma = [];
        for(let i =0; i< resultado.length;i++){
            if(resultado[i]==true){
                ListaConfirma.push(resultado[i]);
            }
        }

        return ListaConfirma.length == resultado.length;
    }
    toJSON() {
        return {
            "produtoNome": this.#produtoNome,
            "produtoValor": this.#produtoValor,
            "produtoId": this.#produtoId,
            "produtoImagem": this.#imagem,
            "marcaNome": this.#marcaNome,
            "categoriaNome": this.#categoriaNome,
            "produtoQuantidade": this.#produtoQuantidade
        }
    }

}

module.exports = ProdutoModel;