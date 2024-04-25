const Voluntario = require(`../models/voluntarioModel`)
const EventosModel = require("../models/eventosModel");
const noticiaModel = require(`../models/noticiaModel`)

class HomeController {

    homeView(req, res) {
        res.render('home');
    }

    QuemSomosView(req, res) {
        res.render('QuemSomos');
    }


    sejaView(req, res) {
        res.render('form');
    }
   
    async eventoView(req,res){  //Visualização de qualquer pessoa, salvo os voluntarios que terão opção extra

    }

    async parceirosView(req,res){

    }

    async projetosView(req,res){    //Se for voluntario dar opção de participar se não tiver acontecido

    }


    //Visualização da noticia
    async listarNoticias(req, res){
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir()

        res.render('noticia/Noticias', {lista : lista});
    }

    //Exibir noticia detalhada
    async especNoticia(req,res){
        let noticia = new noticiaModel();
        let not = await noticia.noticia_exibir_epsc(req.params.id);
        res.render('noticia/noticia_esp', { not : not, layout : 'noticia/noticia_esp'})
    }

    //Doação
    DoacaoView(req, res) {
        res.render('doacao');
    }
    DoaCartaoView(req, res) {
        res.render('formas_pagamento/cartao', { layout: 'formas_pagamento/cartao' });
    }
    DoaBoletoView(req, res) {
        res.render('formas_pagamento/boleto', { layout: 'formas_pagamento/boleto' });
    }
    DoaPixView(req, res) {
        res.render('formas_pagamento/pix', { layout: 'formas_pagamento/pix' });
    }


}

//permite que a classe homeController seja importado
module.exports = HomeController;