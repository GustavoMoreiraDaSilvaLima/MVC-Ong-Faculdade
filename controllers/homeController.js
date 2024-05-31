const VoluntarioModel = require(`../models/voluntarioModel`)
const EventosModel = require("../models/eventosModel");
const noticiaModel = require(`../models/noticiaModel`)

let contador_esp_noticias = 0

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

    async cadastrarVoluntarios(req,res){
        var ok = true;
        if(req.body.email != "" && req.body.nome != "" && 
        req.body.telefone != "" && req.body.desc  != '' && 
        req.body.cpf != '0') {
            let voluntario = new VoluntarioModel(0, req.body.email, 
                req.body.nome, req.body.telefone, 
                req.body.desc, req.body.cpf);

            ok = await voluntario.cadastrar_no_model();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }


    //Visualização da noticia
    async listarEventos(req,res){
        //let evento = new eventosModel();
        //let lista = await evento.evento_exibir()

        res.render('evento')
    }

    async listarNoticias(req, res){
        let noticia = new noticiaModel();
        let lista = await noticia.noticia_exibir()

        res.render('noticia/noticias', {lista : lista});
    }

    //Exibir noticia detalhada
    async especNoticia(req,res){
        if((contador_esp_noticias == 0 || contador_esp_noticias != req.params.id) && req.params.id > 0){
            contador_esp_noticias = req.params.id
        }
        let noticia = new noticiaModel();
        let not = await noticia.noticia_exibir_epsc(contador_esp_noticias);
        res.render('noticia/noticia_esp', { not : not, layout : 'layout'})
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