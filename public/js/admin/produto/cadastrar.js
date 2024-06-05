console.log(`entrou`);

document.addEventListener("DOMContentLoaded", function () {
  var btnGravar = document.getElementById("btnGravar");

  btnGravar.addEventListener("click", gravarProduto);

  var inputImagem = document.getElementById("inputImagem");

  inputImagem.addEventListener("change", exibirPreviaImagem);
});

function exibirPreviaImagem() {
  let file = document.getElementById("inputImagem").files[0];

  if (
    file.type.includes("png") ||
    file.type.includes("jpg") ||
    file.type.includes("jpeg")
  ) {
    let url = URL.createObjectURL(file);

    document.getElementById("previaImagem").setAttribute("src", url);
  } else {
    alert("Imagem inválida!!!");
  }
}

function gravarProduto() {
  debugger;
  var inputCodigo = document.getElementById("inputCodigo");
  var inputNome = document.getElementById("inputNome");
  var inputQtde = document.getElementById("inputQtde");
  var selMarca = document.getElementById("selMarca");
  var selCategoria = document.getElementById("selCategoria");
  var arquivos = document.getElementById("inputImagem").files;
  var inputValor = document
    .getElementById("inputValor")
    .value.replace(",", ".");

  //if de validação básica
  if (
    inputCodigo.value != "" &&
    inputNome.value != "" &&
    inputQtde.value != "" &&
    inputQtde.value != "0" &&
    inputQtde.value > 0 &&
    selMarca.value != "0" &&
    selCategoria.value != "0" &&
    inputValor > 0
  ) {
    let formData = new FormData();

    formData.append("codigo", inputCodigo.value);
    formData.append("nome", inputNome.value);
    formData.append("quantidade", inputQtde.value);
    formData.append("marca", selMarca.value);
    formData.append("categoria", selCategoria.value);
    formData.append("imagem", arquivos[0]);
    formData.append("valor", inputValor);

    fetch("/admin/produto/cadastro", {
      method: "POST",
      body: formData,
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if (r.ok) {
          alert("Produto cadastrado!");
          window.location.href = "/admin/produto";
        } else {
          alert("Erro ao cadastrar produto");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("Preencha todos os campos corretamente!");
    return;
  }
}
