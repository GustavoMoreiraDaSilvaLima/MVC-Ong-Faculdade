const ParceiroModel = require("../../models/parceiroModel")

class parceiroController{

    async parceiroView(req,res){
        res.render(`admin/adminEmDesenvolvimento`, { layout : `admin/adminEmDesenvolvimento`})
    }

    adicionarParceiroView(req,res){

    }

    async adicionarParceiro(req,res){

    }

    async editarParceiroView (req,res){

    }
    async editarParceiro (req,res){

    }

    async excluirParceiro (req,res){
        
    }
}

module.exports = parceiroController;