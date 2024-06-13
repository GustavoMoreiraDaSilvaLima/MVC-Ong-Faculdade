document.addEventListener("DOMContentLoaded", function () {
  var btnConfirmar = document.querySelector("#btnConfirmarPedido");
  var cepInput = document.getElementById("cep");

  btnConfirmar.addEventListener("click", gravarPedido);
  cepInput.addEventListener("change", ()=>{
    debugger
  if (validarCEP(cepInput.value)) {
    cepInput.style.borderColor  = 'green';
    } else {
    cepInput.style.borderColor  = 'red';
    }    
  });



  function gravarPedido() {
debugger
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let cpf = document.getElementById("cpf").value;
    let formaPagamento = document.getElementById("formaPagamento").value;
    let cep =  document.getElementById("cep").value;

    let listaErros = [];
    if (nome == "") {
      listaErros.push("nome");
    }
    if (endereco == "") {
        listaErros.push("endereco");
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
    if (formaPagamento == "") {
        listaErros.push("endereco");
    }
    if(cep == ""){
      listaErros.push('cep');
    }else{
      if (!validarCEP(cep)) {
        listaErros.push("cep");
    }
    }

    let listaCarrinho = JSON.parse(localStorage.getItem("carrinho"));

    let obj = {
        nome : nome,
        endereco : endereco,
        cpf : cpf,
        formaPagamento : formaPagamento,
        cep : cep,
        listaCarrinho : listaCarrinho
    }

    if (listaCarrinho.length > 0) {
      fetch("/pedido/gravar", {
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
          if(r.ok){
            alert(r.msg);
            localStorage.clear()
          }else{
            alert(r.msg);
          }
          window.location.href = "/produtos";
        });
    } else {
      alert("O carrinho está vazio!");
    }
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

    function validarCEP(cep) {
        debugger
        const regex = /^\d{5}-?\d{3}$/;
        return regex.test(cep);
    }

})