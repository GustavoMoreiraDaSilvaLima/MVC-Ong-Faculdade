const CaixaModel = require("../../models/caixaModel");

class CaixaController{



    CaixaView(req,res){
        res.render("admin/admincaixa",{layout: 'adminlayout'});
    }

    atualizarCaixa(){

    }

    abrirCaixa(){

    }

    fecharCaixa(){
        
    }


}

module.exports = CaixaController;