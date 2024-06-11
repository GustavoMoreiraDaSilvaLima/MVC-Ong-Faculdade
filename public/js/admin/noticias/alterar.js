document.addEventListener("DOMContentLoaded", function () {
  var btnAlterar = document.getElementById("btnAlterar");

  btnAlterar.addEventListener("click", function () {
    alterarNoticia();
  });

  var inputImagem = document.getElementById("inputImagem");

  inputImagem.addEventListener("change", exibirPreviaImagem);
});


function exibirPreviaImagem() {

  let file = document.getElementById("inputImagem").files[0];

  if(file.type.includes("png") || 
  file.type.includes("jpg") || 
  file.type.includes("jpeg")) {
      let url = URL.createObjectURL(file);

      document.getElementById("previaImagem").setAttribute("src", url);
  }
  else{
      alert("Imagem inválida!!!");
  }
}

function alterarNoticia() {
  //limparErros();

  var noticiaTitulo = document.getElementById("novoTitulo").value;
  var noticiaDescricao = document.getElementById("novaDescricao").value;
  var noticiaConteudo = document.getElementById("novoConteudo").value;
  var noticiaId = document.getElementById("idNoticia").value;
  var arquivos = document.getElementById("inputImagem").files


  var listaErros = [];

  if (
    noticiaTitulo == "" ||
    noticiaTitulo == undefined ||
    noticiaTitulo == null
  ) {
    listaErros.push("novoTitulo");
  }

  if (
    noticiaDescricao == "" ||
    noticiaDescricao == undefined ||
    noticiaDescricao == null
  ) {
    listaErros.push("novaDescricao");
  }

  if (
    noticiaConteudo == "" ||
    noticiaConteudo == undefined ||
    noticiaConteudo == null
  ) {
    listaErros.push("novoConteudo");
  }
  if (noticiaId == "" || noticiaId == undefined || noticiaId == null) {
    listaErros.push("idNoticia");
  }

  if (listaErros.length == 0) {
    let formData = new FormData();

    formData.append("titulo", noticiaTitulo);
    formData.append("descricao", noticiaDescricao);
    formData.append("conteudo", noticiaConteudo);
    formData.append("id", noticiaId);
    formData.append("imagem", arquivos[0]);

    fetch("/admin/noticias/adminEditar", {
      method: "POST",
      body: formData,
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if (r.ok) {
          alert("Produto alterado!");
          window.location.href = "/admin/noticias";
        } else {
          alert("Erro ao alterar produto");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

/*function mostrarErros(lista) {
        for(var i = 0; i<lista.length; i++){
            let id = lista[i];

            document.getElementById(id).classList.add("campoErro");

            document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

            document.getElementById("erros").style= "display:block";
        }
    }

    function limparErros() {
        document.getElementById("inputNome").classList.remove("campoErro");
        document.getElementById("inputEmail").classList.remove("campoErro");
        document.getElementById("inputSenha").classList.remove("campoErro");
        document.getElementById("inputConfSenha").classList.remove("campoErro");
        document.getElementById("selPerfil").classList.remove("campoErro");

        document.getElementById("erros").style = "display:none";
        document.getElementById("alertaSucesso").style = "display:none";*/
