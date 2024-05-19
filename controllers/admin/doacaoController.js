const DoacaoModel = require("../../models/doacaoModel");

class doacaoController {


    //Doação
    async ListagemDoacaoView(req, res) {
        let Doacao = new DoacaoModel();
        let listadoacao = await Doacao.doacao_listar();

        res.render('admin/adminDoacao', { layout: 'adminLayout', listagemDoacao: listadoacao });
    }

    async excluir(req, res) {
        if (req.body.id != null) {
            let doacao = new DoacaoModel();
            let ok = await doacao.excluir(req.body.id);
            if (ok) {
                res.send({ ok: true });
            }
            else {
                res.send({ ok: false, msg: "Erro ao excluir doação" })
            }
        }
        else {
            res.send({ ok: false, msg: "O id para exclusão não foi enviado" })
        }
    }

    async AlterarDoacaoView(req, res) {

    }

    //Post
    async AlterarDoacao(req, res) {

    }
}

module.exports = doacaoController;