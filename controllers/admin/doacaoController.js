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
        let lista = ''
        if (intervalo == -99) {
            lista = await Doacao.doacao_listar(intervalo);
        } else {
            if (intervalo < 1) {
                intervalo = 1;
            }
            if (intervalo == 1) {
                status = "comeco";
            }
            lista = await Doacao.doacao_listar((intervalo - 1) * 10);
        }

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

        let Situacao = new StatusDoacaoModel();
        let Formas = new FormasPagamentoModel();
        Situacao = await Situacao.listar();
        Formas = await Formas.listar();

        res.send({ ok: ok, item: listaCompleta, status: status, pgt: Formas, situacao: Situacao });
    }

    async obterDoacao(req, res) {
        let Doacao = new DoacaoModel();
        let Usuario = new UsuarioModel();
        let Status = new StatusDoacaoModel();
        let Formas = new FormasPagamentoModel();

        let suaDoa = await Doacao.obter(req.params.id);
        Usuario = await Usuario.listar()
        Status = await Status.listar();
        Formas = await Formas.listar();

        res.send({ lista: suaDoa, pgt: Formas, stt: Status, usu: Usuario });


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
            let Usuario = new UsuarioModel();
            Usuario = await Usuario.obter(nome);
            let doacao = new DoacaoModel(id, tipo, nome, status, Usuario.usuario_nome, valor);

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

        res.render('admin/adminDoacaoManual', { layout: "adminLayout", pagamento: pagamentoLista, lista_usu: UsuariosCadas, status: Status });
    }
    async DoacaoManual(req, res) {
        var ok = true;
        let forma = req.body.forma;
        let status = req.body.status;
        let usuario = req.body.usuario;
        let valor = req.body.valor;

        if (forma != 0 && status != 0 && usuario != 0 && valor > 0) {
            let data = new Date();
            let Usuario = new UsuarioModel();
            Usuario = await Usuario.obter(usuario);
            let Doacao = new DoacaoModel(0, forma, usuario, status, Usuario.usuario_nome, valor, data);

            ok = await Doacao.doacao_inserir_atualizar();
        } else {
            ok = false;
        }

        res.send({ ok: ok });
    }
    DoacaoProdutoView(req, res) {
        res.render('admin/adminDoacaoProduto', { layout: "adminLayout" })
    }
    DoacaoProduto(req, res) {

    }

}

module.exports = doacaoController;
