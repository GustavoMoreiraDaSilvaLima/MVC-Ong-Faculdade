const Database = require("../db/database");

const banco = new Database();
class noticiaModel{
    ONG_NOTICIA_ID
    ONG_NOTICIA_TITULO
    ONG_NOTICIA_DESCRICAO
    ONG_NOTICIA_CONTEUDO
    ONG_NOTICIA_EDITADO
    ONG_NOTICIA_ULTIMA_ALTERACAO
    ONG_NOTICIA_ADMINISTRADOR_CPF
    constructor(id, titulo,desc,conteudo,editado,alterado, noticia_adm_cpf){
        this.ONG_NOTICIA_ID = id;
        this.ONG_NOTICIA_TITULO = titulo;
        this.ONG_NOTICIA_DESCRICAO = desc;
        this.ONG_NOTICIA_CONTEUDO   = conteudo;
        this.ONG_NOTICIA_EDITADO = editado;
        this.ONG_NOTICIA_ULTIMA_ALTERACAO = alterado;
        this.ONG_NOTICIA_ADMINISTRADOR_CPF = noticia_adm_cpf;
    }
        async noticia_inserir_atualizar() {
            if (this.ONG_NOTICIA_ID == 0) {
                let sql = "insert into ONG_NOTICIA (ONG_NOTICIA_TITULO, ONG_NOTICIA_DESCRICAO,ONG_NOTICIA_CONTEUDO) values (?,?,?)";
    
                let valores = [this.ONG_NOTICIA_TITULO, this.ONG_NOTICIA_DESCRICAO, this.ONG_NOTICIA_CONTEUDO];
    
                let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
                return result;
            }
            else {
                let sql = "update ONG_NOTICIA (ONG_NOTICIA_ID, ONG_NOTICIA_TITULO, ONG_NOTICIA_DESCRICAO,ONG_NOTICIA_CONTEUDO,ONG_NOTICIA_EDITADO) values (?,?,?,?,?)";
                let valores = [this.ONG_NOTICIA_ID, this.ONG_NOTICIA_TITULO, this.ONG_NOTICIA_DESCRICAO, this.ONG_NOTICIA_CONTEUDO, this.ONG_NOTICIA_ULTIMA_ALTERACAO];
    
                let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
                return result;
            }
        }
        
    
    noticia_atualizar(){
        
    }
    async noticia_exibir(){
        let sql = "select * from ONG_NOTICIA";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i < rows.length; i++) {
            lista.push(new noticiaModel(rows[i]["ONG_NOTICIA_ID"], rows[i]["ONG_NOTICIA_TITULO"], rows[i]["ONG_NOTICIA_DESCRICAO"], rows[i]["ONG_NOTICIA_CONTEUDO"], rows[i]["ONG_NOTICIA_EDITADO"], rows[i]["ONG_NOTICIA_ULTIMA_ALTERACAO"], 0));
        }
        return lista;
    }

    async noticia_exibir_epsc(id){
        let sql = "select * from ONG_NOTICIA where ONG_NOTICIA_ID = ?";

        let value = [id]

        let rows = await banco.ExecutaComando(sql, value);

        if(rows.length > 0){
            let row = rows[0];
            return new noticiaModel(row["ONG_NOTICIA_ID"], row["ONG_NOTICIA_TITULO"], row["ONG_NOTICIA_DESCRICAO"], row["ONG_NOTICIA_CONTEUDO"], row["ONG_NOTICIA_EDITADO"], row["ONG_NOTICIA_ULTIMA_ALTERACAO"], 0);
        }

        return null;
    }
    async excluir(ONG_NOTICIA_ID){
        let sql = "delete from ONG_NOTICIA where ONG_NOTICIA_ID = ?"
        let valores = [ONG_NOTICIA_ID];

        var result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}
module.exports = noticiaModel;