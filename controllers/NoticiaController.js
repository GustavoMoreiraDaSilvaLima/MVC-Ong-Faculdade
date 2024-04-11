const noticiaModel = require(`../models/noticiaModel`)

class LoginController {

    async listarNoticias(req, res){
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir()

        res.render('noticia/Noticias', {lista : lista});
    }

    async especNoticia(req,res){
        let noticia = new noticiaModel();
        let not = await noticia.noticia_exibir_epsc(req.params.id);
        res.render('noticia/noticia_esp', { not : not, layout : 'noticia/noticia_esp'})
    }
}
    
module.exports = LoginController;