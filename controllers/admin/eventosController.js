const EventosModel = require("../../models/eventosModel");
const PatrimonioModel = require("../../models/patrimonioModel");
const ProdutoModel = require("../../models/produtoModel");
const SaidaEventoModel = require("../../models/SaidaEventoModel");
const UtilData = require("../../utils/data");
const fs = require("fs");

class eventosController {
  async EventosView(req, res) {
    // Visualização do ADM
    let evento = new EventosModel();
    let lista = await evento.exibirEvento();

    res.render("admin/evento/adminEvento", { layout: "adminLayout", lista: lista, });
  }

  EventosCadastrarView(req, res) {
    res.render("admin/evento/adminEventoCadastrar", { layout: "adminLayout" });
  }

  async EventosCadastrar(req, res) {
    let ok = true;
    let msg = "";
    let dataAtual = new UtilData();
    dataAtual = dataAtual.dataAtual();

    if (
      req.body.nome != "" &&
      req.body.descricao != "" &&
      req.body.local != "" &&
      req.body.inicio &&
      req.body.duracao > 0 &&
      req.body.duracao < 24 &&
      req.body.data >= dataAtual
    ) {
      let arquivo = req.file != null ? req.file.filename : null;
      let Evento = new EventosModel(
        0,
        req.body.nome,
        req.body.descricao,
        req.body.inicio,
        req.body.data,
        req.body.duracao,
        req.body.local,
        arquivo,
        "",
        ""
      );

      ok = await Evento.inclu_alterar_Evento();
      msg = "Evento Cadastrado com sucesso!!!";
    } else {
      ok = false;
      msg = "Falha na validação de arquivos";
    }

    res.send({ ok: ok, msg: msg });
  }

  //Função a ser utilizada para Registar saida de evento
  async EventosAlterView(req, res) {
    let Evento = new EventosModel();
    let SaidaItensPatrimonio = [];
    let SaidaItensProdutos = []
    let SaidaRegistrada = ''

    if (req.params.id != undefined && req.params.id != "") {
      Evento = await Evento.obterEvento(req.params.id);

      let dataFormatada = new UtilData();
      dataFormatada = dataFormatada.formatarData(Evento.evento_data);
      Evento.evento_data = dataFormatada;
      SaidaRegistrada = await Evento.VerificarSaida(req.params.id);


      if (SaidaRegistrada.length > 0) {
        SaidaRegistrada = true;
        let SaidaEvento = new SaidaEventoModel(0, 0, 0, 0, req.params.id);
        SaidaItensPatrimonio = await SaidaEvento.ExibirSaidaPatrimonio();
        SaidaItensProdutos = await SaidaEvento.ExibirSaidaProduto();

      } else {
        SaidaRegistrada = false;
      }
    }

    res.render("admin/evento/adminAlterarEvento", {
      dados: Evento,
      saida: SaidaRegistrada,
      ItensSaidaProduto: SaidaItensProdutos,
      ItensSaidaPatrimonio: SaidaItensPatrimonio,
      layout: "adminLayout"
    });
  }

  async EventosAlterar(req, res) {
    let ok = true;
    let msg = "";
    let dataAtual = new UtilData();
    dataAtual = dataAtual.dataAtual();

    if (
      req.body.nome != "" &&
      req.body.descricao != "" &&
      req.body.local != "" &&
      req.body.inicio &&
      req.body.duracao > 0 &&
      req.body.duracao < 24 &&
      req.body.data >= dataAtual &&
      req.body.id > 0
    ) {
      let EventoOld = new EventosModel();
      EventoOld = await EventoOld.obterEvento(req.body.id);
      let imagem = null;

      if (req.file != null) {
        imagem = req.file.filename;
        if (EventoOld.possuiImagem) {
          let imagemAntigo = EventoOld.evento_imagem;
          fs.unlinkSync(global.RAIZ_PROJETO + "/public/" + imagemAntigo);
        }
      } else {
        if (EventoOld.possuiImagem)
          imagem = EventoOld.evento_imagem.toString().split("/").pop();
      }
      let Evento = new EventosModel(
        req.body.id,
        req.body.nome,
        req.body.descricao,
        req.body.inicio,
        req.body.data,
        req.body.duracao,
        req.body.local,
        imagem,
        "",
        ""
      );
      ok = await Evento.inclu_alterar_Evento();
      msg = "Evento atualizado com sucesso";
    } else {
      ok = false;
      msg = "Erro ao Atualizar o Evento";
    }
    res.send({ ok: ok, msg: msg });
  }

  //Registra a saida de evento
  async RegistrarSaida(req, res) {
    let filtro = req.params.filtro;
    let ok = false;
    let msg = "";
    let Evento = new EventosModel();
    let SaidaRegistrada = await Evento.VerificarSaida(req.params.id);
    if (SaidaRegistrada.length > 0) {
      SaidaRegistrada = true;
    } else {
      SaidaRegistrada = false;
    }
    if (!SaidaRegistrada) {
      if (filtro == "produto") {
        let idEvento = req.body.id;
        let idProduto = req.body.idProduto;
        let quantidadeProduto = req.body.quantidadeProduto;
        //Verificar Estoque de produtos
        let Validacao = [];
        let Produto = new ProdutoModel();
        for (let i = 0; i < idProduto.length; i++) {
          let Temp = await Produto.validarEstoque(idProduto[i], quantidadeProduto[i]);
          if (Temp) {
            Validacao.push(Temp[i]);
          }
        }
        if (Validacao.length == idProduto.length) {
          Evento = await Evento.RegistrarSaidaEvento(idEvento, idProduto, quantidadeProduto, filtro);
          Produto = await Produto.RetirarEstoqueSaidaEvento(idProduto, quantidadeProduto);
          if (Evento && Produto) {
            ok = true;
            msg = "Saida de Produtos cadastrada com sucesso";
          } else if (Evento) {
            ok = false;
            msg =
              "Não possivel registrar dar baixa no estoque, faça manualmente";
          } else if (Produto) {
            ok = false;
            msg =
              "Não possivel registrar as saidas do evento, mas o estoque foi alterado, por favor corrija";
          } else {
            ok = false;
            msg = "Não foi possivel registar nem retirar do estoque";
          }
        } else {
          ok = false;
          msg = "Alguns produtos estão quantidades incorretas!";
        }
      } else if (filtro == "patrimonio") {
        let idEvento = req.body.id;
        let idPatrimonio = req.body.idPatrimonio;
        let quantidadePatrimonio = req.body.quantidadePatrimonio;
        //Verificar Estoque de produtos
        let Validacao = [];
        let Patrimonio = new PatrimonioModel();
        for (let i = 0; i < idPatrimonio.length; i++) {
          let Temp = await Patrimonio.validarEstoque(idPatrimonio[i], quantidadePatrimonio[i]);
          if (Temp) {
            Validacao.push(Temp[i]);
          }
        }
        if (Validacao.length == idPatrimonio.length) {
          Evento = await Evento.RegistrarSaidaEvento(idEvento, idPatrimonio, quantidadePatrimonio, filtro);
          Patrimonio = await Patrimonio.RetirarEstoqueSaidaEvento(idPatrimonio, quantidadePatrimonio);
          if (Evento && Patrimonio) {
            ok = true;
            msg = "Saida de Patrimonio cadastrada com sucesso";
          } else if (Evento) {
            ok = false;
            msg =
              "Não possivel registrar dar baixa no estoque, faça manualmente";
          } else if (Patrimonio) {
            ok = false;
            msg =
              "Não possivel registrar as saidas do evento, mas o estoque foi alterado, por favor corrija";
          } else {
            ok = false;
            msg = "Não foi possivel registar nem retirar do estoque";
          }
        } else {
          ok = false;
          msg = "Alguns Patrimonio estão quantidades incorretas!";
        }
      } else {
        ok = false;
        msg = "Erro, Não foi possivel realizar a conexão";
      }
    } else {
      ok = false;
      msg =
        "Este evento já tem uma saida Registrado, impossivel fazer outra!!!";
    }
    res.send({ ok: ok, msg: msg });
  }

  async EventoExcluir(req, res) {
    let ok = false;
    let msg = "Erro ao excluir";
    if (req.body.id != null) {
      let Evento = new EventosModel();
      let verifica = await Evento.CancelarEvento(req.body.id);
      if (verifica == true) {
        ok = true;
        msg = "Evento Cancelado";
      }
    }
    res.send({ ok: ok, msg: msg });
  }

  async EventoFiltro(req, res) {
    let Evento = new EventosModel();
    let parametros = req.params.tipos
    parametros = parametros.split(".");
    parametros.pop();


    let lista = await Evento.Filtros(parametros);

    res.send({lista: lista});
  }
}

module.exports = eventosController;
