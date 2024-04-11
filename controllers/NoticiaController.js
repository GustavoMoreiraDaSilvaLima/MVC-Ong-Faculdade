const noticiaModel = require(`../models/noticiaModel`)

class LoginController {

    async listarNoticias(req, res){
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir()

        res.render('noticias', {lista : lista});
    }
}

module.exports = LoginController;