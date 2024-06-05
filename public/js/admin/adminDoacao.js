document.addEventListener("DOMContentLoaded", function () {
  CarregarTabela();

  var Tabela = document.querySelector("#Tabela");
  var Paginas = document.querySelector("#paginas");

  // Elementos para exportar tabela
  var ExportExcel = document.getElementById("ExportExcel");
  var ExportPdf = document.getElementById("ExportPdf");
  var exportarTabela = document.getElementById("ExportarTabela");

  ExportExcel.addEventListener("input", LiberarBotao);
  ExportPdf.addEventListener("input", LiberarBotao);
  exportarTabela.addEventListener("click", ExporTabela);

  function LiberarBotao() {
    if (ExportPdf.checked || ExportExcel.checked) {
      //Alguma habilitada
      exportarTabela.disabled = false;
    } else if (!ExportPdf.checked && !ExportExcel.checked) {
      //As duas desabilitadas
      exportarTabela.disabled = true;
    }
  }
  async function ExporTabela() {
    let Dados = await BuscarTabela(-99);
    let paginaAtual = document.getElementById("btn_atual").dataset.pagina;
    paginaAtual = parseInt(paginaAtual);

    AtualizaTd(Dados, Dados.status);
    if (ExportExcel.checked) {
      exportarExcel();
    }
    if (ExportPdf.checked) {
      window.print();
    }

    Dados = await BuscarTabela(paginaAtual);
    AtualizaTd(Dados, Dados.status);
  }

  function exportarExcel() {
    //chama a biblioteca para gerar o excel
    var wb = XLSX.utils.table_to_book(document.getElementById("Tabela"));
    /* Export to file (start a download) */
    XLSX.writeFile(wb, "relatorio-doacao.xlsx");
  }

  async function CarregarTabela() {
    let dadosTabela = await BuscarTabela();

    if (dadosTabela.ok) {
      let lista = `
        <thead>
            <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Nome</th>
                <th scope="col">Valor</th>
                <th scope="col">Status</th>
                <th scope="col">Data</th>
                <th class="retirar" scope="col">Ações</th>
            </tr>
        </thead>
        <tbody id="conteudo">`;
      //Carregar o conteudo da lista para monta-lá
      for (let l = 0; l < dadosTabela.item.length; l++) {
        lista += `
            <tr id="${dadosTabela.item[l].id}">
                <td scope="row">`;
        for (let i = 0; i < dadosTabela.pgt.length; i++) {
          if (dadosTabela.item[l].tipo == dadosTabela.pgt[i].id) {
            lista += `${dadosTabela.pgt[i].nome}`;
          }
        }

        lista += `</td>
                <td>
                    ${dadosTabela.item[l].nome}
                </td>
                <td>
                    ${dadosTabela.item[l].valor}
                </td>
                <td>`;
        for (let i = 0; i < dadosTabela.situacao.length; i++) {
          if (dadosTabela.item[l].status == dadosTabela.situacao[i].id) {
            lista += `${dadosTabela.situacao[i].nome}`;
          }
        }

        lista += `</td>
                <td>
                    ${new Date(dadosTabela.item[l].data).toLocaleString()}
                </td>
                <td class="retirar">
                <div class="retirar">
                    <button class="btn btn-primary btnEditar">
                    <i id="1" class="fas fa-pen"></i>
                    </button>
                    <button data-codigoexclusao="${
                      dadosTabela.item[l].id
                    }" class="btn btn-danger btnExcluir"
                    id=""><i class="fas fa-trash"></i>
                    </button>
                </div>
                </td>
            </tr>`;
      }
      lista += `</tbody>`;

      Tabela.innerHTML = lista;
      CarregarPaginas(1, dadosTabela.status);
      CarregarNovosConteudos();
    }
  }

  function CarregarPaginas(numPag = 1, status = "disponivel") {
    if (numPag < 0) {
      numPag = 1;
    }
    console.log(status);
    let desabilitaC =
      status == "comeco"
        ? "'btn btn btn-outline-danger btnAtualizador' disabled"
        : status == "erro tabela"
        ? "'btn btn btn-outline-danger btnAtualizador' disabled"
        : "'btn btn-outline-primary btnAtualizador'";
    let desabilitaF =
      status == "fim"
        ? "'btn btn btn-outline-danger btnAtualizador' disabled"
        : "'btn btn-outline-primary btnAtualizador'";
    let desabilitaFim =
      status == "fim"
        ? "'btn btn btn-outline-danger btnAtualizador' disabled"
        : status == "erro tabela"
        ? "'btn btn-outline-danger btnAtualizador' disabled"
        : "'btn btn-outline-primary btnAtualizador'";
    Paginas.innerHTML = `
                <button data-quant="-10" type="button" class=${desabilitaC}>&lt;&lt;</button>
                <button  data-quant="-1" type="button" class=${desabilitaC}>&lt;</button>
                <button id="btn_atual" data-pagina="${numPag}" type="button" class="btn btn-outline-dark">${numPag}</button>
                <button data-quant="1" type="button" class=${desabilitaF}>&gt;</button>
                <button data-quant="10" type="button" class=${desabilitaFim}>&gt;&gt;</button>
        `;
  }

  async function BuscarTabela(intervalo = 1) {
    return fetch("/admin/doacao/tabela/" + intervalo)
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        console.log(r);
        return r;
      });
  }

  function CarregarNovosConteudos() {
    // var Paginas = document.querySelector("#paginas");
    let BotaoEditar = document.querySelectorAll(".btnEditar");
    let BotaoExcluir = document.querySelectorAll(".btnExcluir");
    let BotaoPagina = document.querySelectorAll(".btnAtualizador");

    for (let i = 0; i < BotaoPagina.length; i++) {
      BotaoPagina[i].addEventListener("click", AtualizarTabela);
    }

    for (let i = 0; i < BotaoEditar.length; i++) {
      BotaoEditar[i].addEventListener("click", Editar);
      BotaoExcluir[i].addEventListener("click", Excluir);
    }
  }
  function Excluir() {
    let id = this.dataset.codigoexclusao;
    if (confirm("Tem certeza que deseja excluir esta doação?")) {
      if (id != "") {
        let obj = {
          id: id,
        };
        fetch("/admin/doacao/excluir", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            if (r.ok) {
              alert(r.msg);
              CancelarAlteracao();
            } else {
              alert(r.msg);
            }
          });
      }
    }
  }

  async function Editar() {
    let idAlterar = this.parentElement.parentElement.parentElement.id;

    let informacao = await BuscarBanco(idAlterar);
    let linha = "";
    let html = document.getElementById(idAlterar);

    console.log(informacao.usu);
    console.log(informacao.lista);
    console.log(informacao.stt);
    linha = `
            <td scope="row">
                <select class="form-control" id="select-${informacao.lista.id}"style="width: 120px;">`;
    for (let i = 0; i < informacao.pgt.length; i++) {
      if (informacao.lista.tipo == informacao.pgt[i].id) {
        linha += `
                        <option value = "${informacao.lista.tipo}" selected>${informacao.pgt[i].nome}</option>
                        <!--Renderizar os tipos de doação-->`;
      } else {
        linha += `
                        <option value = "${informacao.pgt[i].id}">${informacao.pgt[i].nome}</option>
                        <!--Renderizar os tipos de doação-->`;
      }
    }
    linha += `
            </td>
            <td>
                <select class="form-control"  id="nome-${informacao.lista.id}" style="width: 140px;">`;

    for (let i = 0; i < informacao.usu.length; i++) {
      if (informacao.lista.usuario == informacao.usu[i].id) {
        linha += `<option value="${informacao.lista.usuario}" selected>${informacao.usu[i].usuario}</option>`;
      } else {
        linha += `<option value="${informacao.usu[i].id}">${informacao.usu[i].usuario}</option>`;
      }
    }
    linha += `</td>
            <td>
                <input type="number" class="form-control" id="valor-${informacao.lista.id}" value="${informacao.lista.valor}" placeholder="Valor">
            </td>
            <td>
                <select class="form-control"  id="status-${informacao.lista.id}" style="width: 140px;">
            `;
    for (let i = 0; i < informacao.stt.length; i++) {
      if (informacao.lista.status == informacao.stt[i].id) {
        linha += `
                    <option value = "${informacao.lista.status}" selected>${informacao.stt[i].nome}</option>
                    <!--Renderizar os tipos de doação-->`;
      } else {
        linha += `
                    <option value = "${informacao.stt[i].id}" selected>${informacao.stt[i].nome}</option>
                    <!--Renderizar os tipos de doação-->`;
      }
    }
    linha += `
            </td>
            <td>
                <input type="text" class="form-control" value="${new Date(
                  informacao.lista.data
                ).toLocaleDateString()}" disabled>
            </td>

            <td class="retirar">
                <div class="retirar">
                <button data-id="${
                  informacao.lista.id
                }" class="btn btn-success btnSalvar">
                    <i id="1" class="fa fa-check"></i>
                </button>
                <button class="btn btn-danger btnCancelar"
                    id="cancelar-${
                      informacao.lista.id
                    }" ><i class="fa fa-times" aria-hidden="true"></i>
                </button>
                </div>
        </td>
        `;

    html.innerHTML = linha;
    // Carregar botão de salvar ou cancelar a operação
    carregarNovosBotao();
  }

  function carregarNovosBotao() {
    let btnSalvar = document.querySelectorAll(".btnSalvar");
    let btnCancelar = document.querySelectorAll(".btnCancelar");

    for (let i = 0; i < btnSalvar.length; i++) {
      btnSalvar[i].addEventListener("click", SalvarAlteracao);
      btnCancelar[i].addEventListener("click", CancelarAlteracao);
    }
  }

  function SalvarAlteracao() {
    let id = this.dataset.id;

    let inputNome = document.getElementById(`nome-${id}`);
    let inputTipo = document.getElementById(`select-${id}`);
    let inputStatus = document.getElementById(`status-${id}`);
    let inputValor = document.getElementById(`valor-${id}`);

    if (
      inputNome.value != "" &&
      inputTipo.value > 0 &&
      inputStatus.value != "" &&
      inputValor.value > 0
    ) {
      let obj = {
        id: id,
        nome: inputNome.value,
        tipo: inputTipo.value,
        status: inputStatus.value,
        valor: inputValor.value,
      };
      fetch("/admin/doacao/alterar", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          if (r.ok) {
            alert(r.msg);
            CancelarAlteracao();
          } else {
            alert(r.msg);
          }
        });
    } else {
      alert("Dados Faltando ou incorreto!");
    }
  }

  function CancelarAlteracao() {
    AtualizarTabela(0);
  }

  function BuscarBanco(id) {
    return fetch("/admin/doacao/alterar/search/" + id)
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        return r;
      });
  }
  async function AtualizarTabela(quantidade = 1) {
    if (quantidade != 0) {
      quantidade = this.dataset.quant;
    }
    let atual = document.querySelector("#btn_atual").dataset.pagina;
    let NovaPagina = parseInt(atual) + parseInt(quantidade);
    let Tabela_att = await BuscarTabela(NovaPagina);
    if (Tabela_att.status == "erro tabela") {
      NovaPagina = parseInt(atual);
    }

    CarregarPaginas(NovaPagina, Tabela_att.status);
    AtualizaTd(Tabela_att, Tabela_att.status);
    CarregarNovosConteudos();
  }

  function AtualizaTd(item, disponibilidade = "disponivel") {
    if (disponibilidade != "erro tabela") {
      let Conteudo = document.querySelector("#conteudo");
      let TabelaNova = "";
      for (let l = 0; l < item.item.length; l++) {
        TabelaNova += `
                <tr id="${item.item[l].id}">
                <td scope="row">`;
        for (let i = 0; i < item.pgt.length; i++) {
          if (item.item[l].tipo == item.pgt[i].id) {
            TabelaNova += `${item.pgt[i].nome}`;
          }
        }
        TabelaNova += `</td>
                <td>
                    ${item.item[l].nome}
                </td>
                <td>
                    ${item.item[l].valor}
                </td>
                <td>`;
        for (let i = 0; i < item.situacao.length; i++) {
          if (item.item[l].status == item.situacao[i].id) {
            TabelaNova += `${item.situacao[i].nome}`;
          }
        }

        TabelaNova += `</td>
                <td>
                    ${new Date(item.item[l].data).toLocaleString()}
                </td>
                <td class="retirar">
                <div class="retirar">
                    <button class="btn btn-primary btnEditar">
                    <i id="1" class="fas fa-pen"></i>
                    </button>
                    <button data-codigoexclusao="${
                      item.item[l].id
                    }" class="btn btn-danger btnExcluir"
                    id=""><i class="fas fa-trash"></i>
                    </button>
                </div>
                </td>
            `;
      }
      Conteudo.innerHTML = TabelaNova;
    }
  }
});
