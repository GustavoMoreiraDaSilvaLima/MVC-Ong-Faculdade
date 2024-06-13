document.addEventListener("DOMContentLoaded", function () {

  var ExportExcel = document.getElementById("ExportExcel");
  var ExportPdf = document.getElementById("ExportPdf");
  var exportarTabela = document.getElementById("ExportarTabela");

  ExportExcel.addEventListener("input", LiberarBotao);
  ExportPdf.addEventListener("input", LiberarBotao);
  exportarTabela.addEventListener("click", ExporTabela);

  function LiberarBotao() {
    if (ExportPdf.checked || ExportExcel.checked) {
      // Alguma habilitada
      exportarTabela.disabled = false;
    } else {
      // As duas desabilitadas
      exportarTabela.disabled = true;
    }
  }

  async function ExporTabela() {
    //let Dados = await BuscarTabela();
  
    //AtualizaTd(Dados, Dados.status);
    if (ExportExcel.checked) {
      exportarExcel();
    }
    if (ExportPdf.checked) {
      window.print();
    }
  
    //Dados = await BuscarTabela();
    //AtualizaTd(Dados, Dados.status);
    window.location.reload();
  }
  
  

  function exportarExcel() {
    debugger
    // Chama a biblioteca para gerar o excel
    var wb = XLSX.utils.table_to_book(document.querySelector(".venda"));
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

  function AtualizaTd(item, disponibilidade = "disponivel") {
    console.log(item);

    if (disponibilidade !== "erro tabela") {
      let Conteudo = document.querySelector("#venda123");
      let TabelaNova = "";
      for (let l = 0; l < item.lista.length; l++) {
        TabelaNova += `
          <tr id="${item.lista[l].produtoId}">
            <td scope="row">
              ${item.lista[l].produtoNome}
            </td>
            <td>
              ${item.lista[l].produtoValor}
            </td>
            <td>
              <img src="${item.lista[l].produtoImagem}" alt="${item.lista[l].produtoNome}" style="width:50px;height:50px;">
            </td>
            <td>
              ${item.lista[l].marcaNome}
            </td>
            <td>
              ${item.lista[l].categoriaNome}
            </td>
            <td>
              ${item.lista[l].produtoQuantidade}
            </td>
          </tr>`;
      }
      Conteudo.innerHTML = TabelaNova;
    }
  }

});
