const PatrimonioModel = require("../../models/patrimonioModel");

class PatrimonioController {

    
    async patrimonioView(req, res) {
        
        let patrimonio= new PatrimonioModel();
        let lista = await patrimonio.exibirPatrimonio();
        res.render('admin/patrimonio/adminPatrimonio', { lista: lista});
    }

    adicionarPatrimonioView(req, res) {
        res.render('admin/patrimonio/adminCadastrar');
    }

    async adicionarPatrimonio(req, res) {
        // Implementar a lógica para adicionar um patrimônio
    }

    async editarPatrimonioView(req, res) {
        let patrimonio= new PatrimonioModel();
        let lista = await patrimonio.exibirPatrimonio();
        res.render('admin/patrimonio/adminPatrimonio', {lista: lista});
    }

    async editarPatrimonio(req, res) {
        // Implementar a lógica para editar um patrimônio
    }

    async excluirPatrimonio(req, res) {
        // Implementar a lógica para excluir um patrimônio
    }

    async patrimonioPost(){

        if (req.body.nome != "" , req.body.quantidade != "" , req.body.descricao != "", req.body.status != "") {
        let patrimonio = new PatrimonioModel(0, req.body.nome, req.body.quantidade, req.body.descricao, req.body.status);
        let lista = await patrimonio.exibirPatrimonio();

            res.send ({ok: lista});
        }
        else res.send({ok: false});

    }
}

module.exports = PatrimonioController;
