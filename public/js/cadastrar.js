document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("butao_pedido").addEventListener("click", cadastrar);

  function limparValidacao() {
    document.getElementById("nome").style["border-color"] = "#ced4da";
    document.getElementById("cpf").style["border-color"] = "#ced4da";
    document.getElementById("email").style["border-color"] = "#ced4da";
    document.getElementById("telefone").style["border-color"] = "#ced4da";
    document.getElementById("sobre_voce").style["border-color"] = "#ced4da";
  }

  let cpfIn = document.getElementById("cpf");

  cpfIn.addEventListener("change", () => {
    if (!validaCPF(cpfIn.value)) {
      cpfIn.style["border-color"] = "red";
    } else {
      cpfIn.style["border-color"] = "green";
    }
  });

  function validaCPF(cpf) {
    var Soma = 0;
    var Resto;

    var strCPF = String(cpf).replace(/[^\d]/g, "");

    if (strCPF.length !== 11) return false;

    if (
      [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
      ].indexOf(strCPF) !== -1
    )
      return false;

    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;

    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;

    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;

    if (Resto != parseInt(strCPF.substring(10, 11))) return false;

    return strCPF;
  }

  function cadastrar() {
    limparValidacao();
    let nome = document.querySelector("#nome").value;
    let cpf = document.getElementById("cpf").value;
    let esc = document.querySelector("#esc").value;
    let email = document.querySelector("#email").value;
    let telefone = document.querySelector("#telefone").value;
    let sobre_voce = document.querySelector("#sobre_voce").value;

    let listaErros = [];
    if (nome == "") {
      listaErros.push("nome");
    }
    if (cpf == "") {
      listaErros.push("cpf");
    } else {
      if (!validaCPF(cpf)) {
        listaErros.push("cpf");
      } else {
        cpf = validaCPF(cpf);
      }
    }
    if (email == "") {
      listaErros.push("email");
    }
    if (telefone == "") {
      listaErros.push("telefone");
    }
    if (sobre_voce == "") {
      listaErros.push("sobre_voce");
    }

    if (listaErros.length == 0) {
      //enviar ao backend com fetch

      let obj = {
        esc: esc,
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        sobre_voce: sobre_voce,
      };

      fetch("/send/seja_um_voluntario", {
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
            window.location.href = "/";
          } else {
            alert(r.msg);
          }
        });
    } else {
      //avisar sobre o preenchimento incorreto
      for (let i = 0; i < listaErros.length; i++) {
        let campos = document.getElementById(listaErros[i]);
        campos.style["border-color"] = "red";
      }
      alert("Preencha corretamente os campos!");
    }
  }
});
