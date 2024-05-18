const noticiaModel = require(`../../models/noticiaModel`)

class noticiaController {

    //Visualização especial para o ADM, layout de ADministrador lembrar de colocar
    async listarNoticias(req, res) {
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir()

        res.render('noticia/Noticias', { lista: lista });
    }


    /*//Ver Noticias/EXibir mais detalhamente             Pode melhorar e quando o ADM clicar para ver, aparecer a opção de editar
    async especNoticia(req,res){
        let noticia = new noticiaModel();
        let not = await noticia.noticia_exibir_epsc(req.params.id);
        res.render('noticia/noticia_esp', { not : not, layout : 'noticia/noticia_esp'})
    }
    */

    //Excluir uma noticia
    async excluirNoticia(req, res) {

    }

    adicionarNoticaView(req, res) {

    }

    async adicionarNoticia(req, res) {

    }


    async editarNoticiaView(req, res) {

    }
    //Essa ou a de abrir a notica já vir para editar
    async editarNoticia(req, res) {

    }

}

module.exports = noticiaController;