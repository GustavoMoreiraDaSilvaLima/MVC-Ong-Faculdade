const patrimonioModel = require("../../models/patrimonioModel");
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
        if(req.body.coditem > 0, req.body.nome !="", req.body.descricao !="", req.body.quantidade > 0, req.body.status !=""){
            let patrimonio = new PatrimonioModel(0, req.body.coditem, req.body.nome, req.body.descricao, req.body.quantidade, req.body.status);
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
        var ok = true;
        if(req.body.patrimonioId != ""){
            let patrimonio = new patrimonioModel();
            ok = await patrimonio.excluirPatrimonio(req.body.patrimonioId);
        }else{
            ok = false;
        }
        res.send({ok: ok});

    }

    async exibirPatrimonioPost() {
        var ok = true;
        if(req.body.id !="", req.body.coditem > 0,  req.body.nome !="", req.body.descricao !="", req.body.quantidade > 0, req.body.status !=""){

        }
        let produto = new ProdutoModel(req.body.id, req.body.coditem, req.body.nome, req.body.descricao, req.body.quantidade, req.body.status);
        ok = await produto.cadastrarPatrimonioView();
        
        }
     async Listar(req,res){
        let Patrimonio = new PatrimonioModel()
        Patrimonio = await Patrimonio.exibirPatrimonio();

        res.send({item: Patrimonio});
    }
}

module.exports = PatrimonioController;
