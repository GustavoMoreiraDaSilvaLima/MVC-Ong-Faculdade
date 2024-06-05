document.addEventListener("DOMContentLoaded", function () {
  let btnExcluir = document.querySelectorAll(".btnExcluir");

  for (let i = 0; i < btnExcluir.length; i++) {
    btnExcluir[i].addEventListener("click", excluirPatrimonio);
  }
});

function excluirPatrimonio() {
  if (window.confirm("Tem certeza que deseja excluir este patrimônio?")) {
    //recuperar id pelo dataset
    let id = this.dataset.codigo;
    var data = {
      patrimonioId: id,
    };

    fetch("/admin/patrimonio/excluir/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (r) {
        if (r.ok) {
          window.location.reload();
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}
