const noticiaModel = require(`../../models/noticiaModel`)

class noticiaController {

    //Visualização especial para o ADM, layout de ADministrador lembrar de colocar
    async listarNoticias(req, res) {
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir()

        res.render('admin/noticias/adminNoticia', { lista: lista, layout : "adminLayout" });
    }
    


    /*//Ver Noticias/EXibir mais detalhamente             Pode melhorar e quando o ADM clicar para ver, aparecer a opção de editar
    async especNoticia(req,res){
        let noticia = new noticiaModel();
        let not = await noticia.noticia_exibir_epsc(req.params.id);
        res.render('noticia/noticia_esp', { not : not, layout : 'noticia/noticia_esp'})
    }
    */

    //Excluir uma noticia
    async excluirNoticia(req, res){
        var ok = true;
        if(req.body.NoticiaId != "") {
            let noticia = new noticiaModel();
            ok = await noticia.excluir(req.body.NoticiaId);
        }
        else{
            ok = false;
        }

        res.send({ok: ok});
    }

    async adicionarNoticaView(req, res) {

        res.render('admin/noticias/adminCadastrar', {layout : "adminLayout"});

    }

    async adicionarNoticia(req, res) {
        console.log(req.body)
        if (req.body.titulo != "" , req.body.descricao != "" , req.body.conteudo != "") {
            let noticia = new noticiaModel(0, req.body.titulo, req.body.descricao, req.body.conteudo);
            let result = await noticia.noticia_inserir_atualizar();

            res.send ({ok: result});
        }
        else res.send({ok: false});
            
    }

    


    async editarNoticiaView(req, res) {
        let id = req.params.id;
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir_epsc(id)
        res.render('admin/noticias/adminAlterar', {lista: lista, layout : "adminLayout"});
    }
    //Essa ou a de abrir a notica já vir para editar
    async editarNoticia(req, res) {
        console.log("controller")
        if (req.body.id != "", req.body.titulo != "" , req.body.descricao != "" , req.body.conteudo != "") {
            let noticia = new noticiaModel(req.body.id, req.body.titulo, req.body.descricao, req.body.conteudo);
            let result = await noticia.noticia_inserir_atualizar();

            res.send ({ok: result});
        }
        else res.send({ok: false});
    }

}


module.exports = noticiaController;