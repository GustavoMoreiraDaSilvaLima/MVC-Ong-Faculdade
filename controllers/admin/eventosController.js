const EventosModel = require("../../models/eventosModel");
const UtilData = require("../../utils/data");

class eventosController {

    async EventosView(req, res) {       // Visualização do ADM
        let evento = new EventosModel();
        let lista = await evento.exibirEvento();

        res.render('admin/evento/adminEvento', { layout: 'adminLayout', lista: lista });
    }

    EventosCadastrarView(req, res) {
        res.render('admin/evento/adminEventoCadastrar', { layout: 'adminLayout' });
    }

    async EventosCadastrar(req, res) {
        let ok = true;
        let msg = ""
        let dataAtual = new UtilData();
        dataAtual = dataAtual.dataAtual();

        if (req.body.nome != '' && req.body.descricao != '' && req.body.local != '' && req.body.inicio && req.body.duracao > 0 &&
            req.body.duracao < 24 && req.body.data >= dataAtual) {
            let arquivo = req.file != null ? req.file.filename : null;
            let Evento = new EventosModel(0, req.body.nome, req.body.descricao, req.body.inicio, req.body.data, req.body.duracao, req.body.local, arquivo, "", "");

            ok = await Evento.inclu_alterar_Evento();
            msg = "Evento Cadastrado com sucesso!!!";
        }
        else {
            ok = false;
            msg = "Falha na validação de arquivos";
        }

        res.send({ ok: ok, msg: msg })
    }



    //Função a ser utilizada para Registar saida de evento
    async EventosAlterView(req, res) {
        let Evento = new EventosModel();

        if (req.params.id != undefined && req.params.id != "") {
            Evento = await Evento.obterEvento(req.params.id);
        }
        let dataFormatada = new UtilData(Evento.evento_data);
        dataFormatada = dataFormatada.formatarData();
        Evento.evento_data = dataFormatada;
        res.render("admin/evento/adminAlterarEvento", { layout: 'adminLayout', dados: Evento });
    }



    async EventosAlterar(req, res) {
        let ok = true;
        let msg = ""
        let dataAtual = new UtilData();
        dataAtual = dataAtual.dataAtual();


        if (req.body.nome != '' && req.body.descricao != '' && req.body.local != '' && req.body.inicio && req.body.duracao > 0 &&
            req.body.duracao < 24 && req.body.data >= dataAtual && req.body.id > 0) {

            let EventoOld = new EventosModel();
            EventoOld = await EventoOld.obterEvento(req.body.id);
            let imagem = null;

            if (req.file != null) {
                imagem = req.file.filename;
                if (EventoOld.possuiImagem) {
                    let imagemAntigo = EventoOld.evento_imagem;
                    fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntigo);
                }
            }
            else {
                if (EventoOld.possuiImagem)
                    imagem = EventoOld.evento_imagem.toString().split("/").pop();
            }
            let Evento = new EventosModel(req.body.id, req.body.nome, req.body.descricao, req.body.inicio, req.body.data, req.body.duracao, req.body.local, imagem, "", "");
            ok = await Evento.inclu_alterar_Evento();
            msg = "Cadastro atualizado com sucesso";
        } else {
            ok = false;
            msg = "Erro ao Atualizar o cadastro";
        }
        res.send({ok: ok, msg: msg});
    }


    async EventoRegistarLista(req, res) {

    }
    //Registra a saida de evento
    async RegistrarSaida(req, res) {
        let filtro = req.params.filtro;
        let ok = false;
        let msg = ''
        if(filtro=="produto"){

        }else if (filtro == "patrimonio"){

        }else{
            msg = "Erro, Não foi possivel realizar a conexão"
        }

    }

    EventoExcluir(req, res) {

    }


}

module.exports = eventosController;