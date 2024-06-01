const EventosModel = require("../../models/eventosModel");

class eventosController{

    async EventosView(req,res){       // Visualização do ADM
        let evento = new EventosModel();
        let lista = await evento.exibirEvento();
        
        res.render('admin/adminEvento',{layout: 'adminLayout',lista : lista});
    }

    EventosCadastrarView(req,res){
        
    }

    EventosCadastrar(req,res){

    }

    EventosAlterView(req,res){

    }

    EventosAlterar(req,res){

    }

    EventoExcluir(req,res){

    }

    
}

module.exports = eventosController;