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
                numcvv: cod
            }

            fetch("/send/cartao", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        window.location.href = "/doacao";
                    }
                    else {
                        alert(r.msg);
                    }
                })
        }
        else {
            //avisar sobre o preenchimento incorreto
            for (let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

})