document.addEventListener("DOMContentLoaded", function () {
  var btnCadastrar = document.getElementById("btnCadastar");

  btnCadastrar.addEventListener("click", Cadastrar);

  var inputImagem = document.getElementById("eventImage");

  inputImagem.addEventListener("change", exibirPreviaImagem);
});

function exibirPreviaImagem() {
  let file = document.getElementById("eventImage").files[0];

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

function Cadastrar() {
  limparValidacao();
  let nomeEvento = document.getElementById("eventName");
  let descEvento = document.getElementById("eventDescription");
  let localEvento = document.getElementById("eventLocation");
  let horaIniEvento = document.getElementById("eventStartTime");
  let duraEvento = document.getElementById("eventDuration");
  let dataEvento = document.getElementById("eventDate");
  let arquivos = document.getElementById("eventImage").files;

  let hoje = FormatarDataAtual();
  let listaErros = [];

  if (nomeEvento.value == "") {
    listaErros.push("eventName");
  }
  if (descEvento.value == "") {
    listaErros.push("eventDescription");
  }
  if (localEvento.value == "") {
    listaErros.push("eventLocation");
  }
  if (!horaIniEvento.value) {
    listaErros.push("eventStartTime");
  }
  if (!duraEvento.value || duraEvento.value < 0 || duraEvento.value > 23) {
    listaErros.push("eventDuration");
  }
  if (dataEvento.value < hoje) {
    listaErros.push("eventDate");
  }

  if (listaErros.length == 0) {
    let formData = new FormData();

    formData.append("nome", nomeEvento.value);
    formData.append("descricao", descEvento.value);
    formData.append("local", localEvento.value);
    formData.append("inicio", horaIniEvento.value);
    formData.append("duracao", duraEvento.value);
    formData.append("data", dataEvento.value);
    formData.append("imagem", arquivos[0]);

    fetch("/admin/eventos/cadastrar", {
      method: "POST",
      body: formData,
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if (r.ok) {
          alert(r.msg);
          window.location.href = `/admin/eventos`;
        } else {
          alert(r.msg); 
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    for (let i = 0; i < listaErros.length; i++) {
      let campos = document.getElementById(listaErros[i]);
      campos.style["border-color"] = "red";
    }
    alert("Preencha corretamente os campos indicados!");
  }
}

function limparValidacao() {
  document.getElementById("eventName").style["border-color"] = "#ced4da";
  document.getElementById("eventDescription").style["border-color"] = "#ced4da";
  document.getElementById("eventLocation").style["border-color"] = "#ced4da";
  document.getElementById("eventStartTime").style["border-color"] = "#ced4da";
  document.getElementById("eventDuration").style["border-color"] = "#ced4da";
  document.getElementById("eventDate").style["border-color"] = "#ced4da";
}

function FormatarDataAtual() {
  let hoje = new Date();
  let dia = hoje.getDate();
  let mes = hoje.getMonth() + 1;
  let ano = hoje.getFullYear();
  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }

  hoje = `${ano}-${mes}-${dia}`;
  return hoje;
}
