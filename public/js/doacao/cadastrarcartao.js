document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enviar").addEventListener("click", cadastrar);

  function limparValidacao() {
    document.getElementById("nome").style["border-color"] = "#ced4da";
    document.getElementById("data").style["border-color"] = "#ced4da";
    document.getElementById("op").style["border-color"] = "#ced4da";
    document.getElementById("cartao").style["border-color"] = "#ced4da";
    document.getElementById("cod_cvv").style["border-color"] = "#ced4da";
    document.getElementById("ident").style["border-color"] = "#ced4da";
    document.getElementById("valor").style["border-color"] = "#ced4da";
  }

  let cpfIn = document.getElementById("ident");

  cpfIn.addEventListener("change", () => {
    if (validaCPF(cpfIn.value)) {
        cpfIn.style["border-color"] = "green";
    } else if (validarCNPJ(cpfIn.value)) {
        cpfIn.style["border-color"] = "green";
    } else {
        cpfIn.style["border-color"] = "red";
    }
});

function validarCNPJ(cnpj) {
 
  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj == '') return false;
   
  if (cnpj.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
      cnpj == "11111111111111" || 
      cnpj == "22222222222222" || 
      cnpj == "33333333333333" || 
      cnpj == "44444444444444" || 
      cnpj == "55555555555555" || 
      cnpj == "66666666666666" || 
      cnpj == "77777777777777" || 
      cnpj == "88888888888888" || 
      cnpj == "99999999999999")
      return false;
       
  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;
       
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;
         
  return cnpj;
  
}

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
    let data = document.querySelector("#data").value;
    let op = document.querySelector("#op").value;
    let cartao = document.querySelector("#cartao").value;
    let cod = document.querySelector("#cod_cvv").value;
    let cpf = document.querySelector("#ident").value;
    let valor = document.querySelector("#valor").value;

    let listaErros = [];
    if (nome == "") {
      listaErros.push("nome");
    }
    if (data == "") {
      listaErros.push("data");
    }
    if (op == "") {
      listaErros.push("op");
    }
    if (cartao == "") {
      listaErros.push("cartao");
    }
    if (cod == "") {
      listaErros.push("cod");
    }
    if (cpf == "") {
      listaErros.push("cpf");
    }
    if (valor < 0) {
      listaErros.push("valor");
    }
    if (listaErros.length == 0) {
      //enviar ao backend com fetch

      let obj = {
        nome: nome,
        cpf_cnpj: cpf,
        data: data,
        selOpcao: op,
        valor: valor,
        numcartao: cartao,
        numcvv: cod,
      };

      fetch("/send/cartao", {
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
            window.location.href = "/doacao";
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
      alert("Preencha corretamente os campos indicados!");
    }
  }
});
