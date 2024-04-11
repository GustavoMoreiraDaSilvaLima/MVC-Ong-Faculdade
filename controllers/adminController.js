const DoacaoModel = require(`../models/doacaoModel`);

class adminController{

    async ListagemDoacaoView(req, res){
        let doacao = new DoacaoModel();
        let listadoacao = await doacao.doacao_exibir();

        res.render('admin/listagemdoacao', { layout: 'admin/listagemdoacao', listagemDoacao: listadoacao});
    }
}

module.exports = adminController;