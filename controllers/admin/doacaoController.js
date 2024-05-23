const DoacaoModel = require("../../models/doacaoModel");
const FormasPagamentoModel = require("../../models/FormasPagamentoModel");
const UsuarioModel = require("../../models/usuarioModel");
const StatusDoacaoModel = require("../../models/statusDoacaoModel");

class doacaoController {



    //Doação
    async ListagemDoacaoView(req, res) {



        res.render('admin/adminDoacao', { layout: 'adminLayout' });
    }

    async AtualizarLista(req, res) {
        let Doacao = new DoacaoModel();
        let status = "disponivel";
        let intervalo = req.params.intervalo;
        if (intervalo < 1) {
            intervalo = 1;
        }
        if (intervalo == 1) {
            status = "comeco";
        }

        let lista = await Doacao.doacao_listar((intervalo - 1) * 10);

        let listaCompleta = [];

        //Inserir via JSON em uma lista para enviar ao Javascript no Front-End
        for (let i = 0; i < lista.length; i++) {
            listaCompleta[i] = lista[i].toJSON();
        }

        if (listaCompleta.length < 10) {
            status = "fim";
        }

        if (listaCompleta.length == 0) {
            status = "erro tabela";
        }

        let ok = false
        if (listaCompleta.length > 0) {
            ok = true
        }

        res.send({ ok: ok, item: listaCompleta, status: status });
    }

    async obterDoacao(req, res) {
        let Doacao = new DoacaoModel();
        let suaDoa = await Doacao.obter(req.params.id);
        suaDoa = suaDoa.toJSON();
        res.send({lista: suaDoa });


    }


    async excluir(req, res) {
        let ok = false
        let msg = "Erro ao excluir"
        if (req.body.id != null) {
            let doacao = new DoacaoModel();
            let verifica = await doacao.excluir(req.body.id);
            if (verifica == true) {
                ok = true
                msg = "Doação excluida"
            }
        }
        res.send({ ok: ok, msg: msg });
    }


    //Post
    async AlterarDoacao(req, res) {
        let id = req.body.id;
        let nome = req.body.nome;
        let tipo = req.body.tipo;
        let status = req.body.status;
        let valor = req.body.valor;
        let ok = false;
        let msg = "Dados faltando ou incorreto"
        if (id != null && nome != '' && tipo > 0 && status != '' && valor > 0) {
            let doacao = new DoacaoModel(id, tipo, null, status,nome, valor);

            let alter = await doacao.doacao_inserir_atualizar();
            if (alter == true) {
                ok = true
                msg = "Doacao alterada com sucesso";
            }
            else {
                msg = "Falha na transação de banco de dados!!!"
            }

        }
        res.send({ ok, msg });
    }

    async DoacaoManualView(req, res) {
        let pagamentoLista = new FormasPagamentoModel();
        pagamentoLista = await pagamentoLista.listar();
        let UsuariosCadas = new UsuarioModel();
        UsuariosCadas = await UsuariosCadas.listar();
        let Status = new StatusDoacaoModel();
        Status = await Status.listar();

        res.render('admin/adminDoacaoManual', { layout: "adminLayout", pagamento: pagamentoLista, lista_usu: UsuariosCadas, status: Status});
    }
    DoacaoManual(req, res) {

    }
    DoacaoProdutoView(req, res) {
        res.render('admin/adminDoacaoProduto', { layout: "adminLayout" })
    }
    DoacaoProduto(req, res) {

    }

}

module.exports = doacaoController;
