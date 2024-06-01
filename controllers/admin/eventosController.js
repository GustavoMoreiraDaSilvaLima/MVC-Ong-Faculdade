const EventosModel = require("../../models/eventosModel");
const UtilData = require("../../utils/data");

class eventosController{

    async EventosView(req,res){       // Visualização do ADM
        let evento = new EventosModel();
        let lista = await evento.exibirEvento();
        
        res.render('admin/evento/adminEvento',{layout: 'adminLayout',lista : lista});
    }

    EventosCadastrarView(req,res){
        res.render('admin/evento/adminEventoCadastrar',{layout:'adminLayout' });
    }

    async EventosCadastrar(req,res){
        let ok = true;
        let msg = ""
        let dataAtual = new UtilData();
        dataAtual = dataAtual.dataAtual();

        if(req.body.nome != '' && req.body.descricao != '' && req.body.local != '' && req.body.inicio && req.body.duracao > 0 && 
        req.body.duracao < 24 && req.body.data >= dataAtual){
            let arquivo = req.file != null ? req.file.filename : null;
            let Evento =  new EventosModel(0,req.body.nome,req.body.descricao,req.body.inicio,req.body.data,req.body.duracao,req.body.local, arquivo,"");
            
            ok = await Evento.inclu_alterar_Evento();
            msg="Evento Cadastrado com sucesso!!!";
        }
        else{
            ok = false;
            msg = "Falha na validação de arquivos";
        }

        res.send({ok: ok, msg: msg})
    }

    EventosAlterView(req,res){

    }

    EventosAlterar(req,res){

    }

    EventoExcluir(req,res){

    }

    
}

module.exports = eventosController;