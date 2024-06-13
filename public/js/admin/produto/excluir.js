document.addEventListener("DOMContentLoaded", function () {
  var listaBtns = document.querySelectorAll(".btnExcluir");
  document.getElementById("btnFiltrar").addEventListener("click", buscar);

  for (var i = 0; i < listaBtns.length; i++) {
    listaBtns[i].addEventListener("click", excluirProduto);
  }

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
            document.querySelector(".venda").innerHTML = htmlCorpo;
          }
        } else {
          let htmlCorpo = "<h1>Produto nao encontrado</h1>";
          document.querySelector(".venda").innerHTML = htmlCorpo;
        }
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
