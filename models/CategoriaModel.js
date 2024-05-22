const Database = require('../db/database');

const conexao = new Database();
class CategoriaModel {

    #categoriaId;
    #categoriaNome;

    get categoriaId() { return this.#categoriaId; } set categoriaId(categoriaId) {this.#categoriaId = categoriaId;}
    get categoriaNome() { return this.#categoriaNome; } set categoriaNome(categoriaNome) {this.#categoriaNome = categoriaNome;}

    constructor(categoriaId, categoriaNome) {
        this.#categoriaId = categoriaId
        this.#categoriaNome = categoriaNome
    }


    async listarCategorias() {

        let sql = 'select * from tb_categoria';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new CategoriaModel(row['cat_id'], row['cat_nome']));
            }
        }

        return listaRetorno;
    }

}

module.exports = CategoriaModel;