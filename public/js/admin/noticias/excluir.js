document.addEventListener("DOMContentLoaded", function () {
  //carregarUsuarios();

  let btnExcluir = document.querySelectorAll(".btnExcluir");

  for (let i = 0; i < btnExcluir.length; i++) {
    btnExcluir[i].addEventListener("click", excluirNoticia);
  }
});

function excluirNoticia() {
  if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
    //recuperar id pelo dataset
    let id = this.dataset.codigo;
    var data = {
      NoticiaId: id,
    };

    fetch("/admin/noticias/excluir/" + id, {
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

/*function carregarUsuarios() {
    fetch('/usuarios/listar')
    .then(r => {
        return r.json();
    })
    .then(r => {
        console.log(r);
        if(r.lista.length > 0){
            let html = "";
            for(var i = 0; i<r.lista.length; i++) {
                html += `<tr>
                            <td>${r.lista[i].id}</td>
                            <td>${r.lista[i].nome}</td>                           
                            <td>${r.lista[i].email}</td>
                            <td>${r.lista[i].ativo}</td>
                            <td>${r.lista[i].perfilId}</td>
                        </tr>`
            }

            document.getElementById("corpoTabela").innerHTML += html;
        }
    })
    .catch(e => {
        console.log(e);
    })
*/
