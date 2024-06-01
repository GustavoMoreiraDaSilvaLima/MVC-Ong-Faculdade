const PatrimonioModel = require("../../models/patrimonioModel");

class PatrimonioController {

    
    async patrimonioView(req, res) {
        
        let patrimonio= new PatrimonioModel();
        let lista = await patrimonio.exibirPatrimonio();
        res.render('admin/patrimonio/adminPatrimonio', { lista: lista, layout: 'adminLayout'});
    }

    cadastrarPatrimonioView(req, res) {
        res.render('admin/patrimonio/adminCadastrar', {layout:'adminLayout'});
    }

    async cadastrarPatrimonioPost(req, res) {
        if(req.body.nome !="", req.body.descricao !="", req.body.quantidade > 0, req.body.status !=""){
            let patrimonio = new PatrimonioModel(0, req.body.nome, req.body.descricao, req.body.quantidade, req.body.status);
            let resultado = await patrimonio.atualizarPatrimonio();
            res.send ({ok: resultado, msg: 'Patrimonio cadastrado!'});
            }else
            res.send({ok: false, msg: 'Erro ao cadastrar patrimonio.'});
    }

    async editarPatrimonioView(req, res) {
        let patrimonio= new PatrimonioModel();
        let lista = await patrimonio.exibirPatrimonio();
        res.render('admin/patrimonio/adminPatrimonio', {lista: lista, layout: 'adminLayout'});
    }

    async editarPatrimonioPost(req, res) {
        // Implementar a lógica para editar um patrimônio
    }

    async excluirPatrimonio(req, res) {
        // Implementar a lógica para excluir um patrimônio
    }
    async atualizarPatrimonioPost() {
        var ok = true;
        if(req.body.id !="", req.body.nome !="", req.body.descricao !="", req.body.quantidade > 0, req.body.status !=""){

        }
        let produto = new ProdutoModel(req.body.id, req.body.nome, req.body.descricao, req.body.quantidade, req.body.status);
        ok = await produto.cadastrarPatrimonioView();
        
        }
        
    
   
}

module.exports = PatrimonioController;
