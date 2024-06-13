document.addEventListener("DOMContentLoaded", function () {
  var listaBtns = document.querySelectorAll(".btnExcluir");

  for (var i = 0; i < listaBtns.length; i++) {
    listaBtns[i].addEventListener("click", excluirProduto);
  }

  var ExportExcel = document.getElementById("ExportExcel");
  var ExportPdf = document.getElementById("ExportPdf");
  var exportarTabela = document.getElementById("ExportarTabela");

  let quantiaMin = document.getElementById("quantityMin");
  let quantiaMax = document.getElementById("quantityMax");
  quantiaMin.addEventListener("change", () => {
    if (quantiaMin.value < 0) {
      quantiaMin.value = 0;
    } else if (quantiaMin.value > 999) {
      quantiaMin.value = 999;
    }
  });
  quantiaMax.addEventListener("change", () => {
    if (quantiaMax.value < 0) {
      quantiaMax.value = 0;
    } else if (quantiaMax.value > 999) {
      quantiaMax.value = 999;
    }
  });

  document.getElementById("btnFiltrar").addEventListener("click", buscar);

  async function buscar() {
    let nome = document.getElementById("productName").value;
    let tipoPreco =
      document.querySelector('input[name="priceOrder"]:checked')?.id || "";
    let marcas = Array.from(
      document.querySelectorAll('input[name="brand"]:checked')
    ).map((el) => el.id);
    let categorias = Array.from(
      document.querySelectorAll('input[name="category"]:checked')
    ).map((el) => el.id);
    let quantMin = document.getElementById("quantityMin").value;
    let quantMax = document.getElementById("quantityMax").value;


    let obj = {
      nome: nome,
      tipoPreco: tipoPreco,
      categorias: categorias,
      marcas: marcas,
      quantiaMin: quantMin,
      quantiaMax: quantMax,
    };

    fetch(`/admin/produto/filtrar`, {
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
        if (r.lista.length > 0) {
          let htmlCorpo = "";
          for (let i = 0; i <= r.lista.length; i++) {
            htmlCorpo += `<tr><td>`;

            if (r.lista[i].produtoImagem != "") {
              htmlCorpo += `<img src="${r.lista[i].produtoImagem}" width="80" />`;
            } else {
              htmlCorpo += `<img src="/img/sem-foto.png" width="80">`;
            }
            htmlCorpo += `
                </td>
                <td>${r.lista[i].produtoCodigo}</td>
                <td>${r.lista[i].produtoNome}</td>
                <td>${r.lista[i].produtoQuantidade}</td>
                <td>${r.lista[i].categoriaNome}</td>
                <td>${r.lista[i].produtoValor}</td>
                <td>${r.lista[i].marcaNome}</td>                   
                <td>
                    <div class="btn-group" role="group" aria-label="Ações">
                    <a href="produto/alterar/${r.lista[i].produtoId}" class="btn btn-primary"> <i class="bi bi-pen"></i></a>
                    <button data-codigo="${r.lista[i].produtoId}" class="btn btn-danger btnExcluir"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
                </tr>
                            `;
            document.getElementById("venda").innerHTML = htmlCorpo;
          }
        } else {
          let htmlCorpo = "<h1>Produto nao encontrado</h1>";
          document.getElementById("venda").innerHTML = htmlCorpo;
        }
      });
  }

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
    let Dados = await BuscarTabela();
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

  function exportarExcel() {
    //chama a biblioteca para gerar o excel
    var wb = XLSX.utils.table_to_book(document.getElementById("Tabela"));
    /* Export to file (start a download) */
    XLSX.writeFile(wb, "relatorio-doacao.xlsx");
  }

  async function BuscarTabela() {
    return fetch("/admin/produto/tabela")
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        console.log(r);
        return r;
      });
  }

  function excluirProduto() {
    var codigo = this.dataset.codigo;
    if (confirm("Tem certeza que deseja excluir")) {
      if (codigo != "") {
        var data = {
          codigo: codigo,
        };
        fetch("/admin/produto/deletar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            if (r.ok) {
              window.location.reload();
            } else {
              alert("Erro ao excluir produto");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }
});
