const CaixaModel = require("../../models/caixaModel");

class CaixaController{



    CaixaView(req,res){
        res.render("admin/adminCaixa",{layout: 'adminLayout'});
    }

    atualizarCaixa(){

    }

    abrirCaixa(){

    }

    fecharCaixa(){
        
    }


}

module.exports = CaixaController;