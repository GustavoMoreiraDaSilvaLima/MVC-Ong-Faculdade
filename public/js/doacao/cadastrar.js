document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("txtnome").style["border-color"] = "#ced4da";
        document.getElementById("temail").style["border-color"] = "#ced4da";
        document.getElementById("ttelefone").style["border-color"] = "#ced4da";
        document.getElementById("tcpf").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        alert("oi");
        let nome = document.querySelector("#txtnome").value;
        let email = document.querySelector("#temail").value;
        let telefone = document.querySelector("#ttelefone").value;
        let cpf = document.querySelector("#tcpf").value;
        let op = document.querySelector("#op").value;
        let listaErros = [];
        if (nome == "") {
            listaErros.push("txtnome");
        }
        if (email == "") {
            listaErros.push("txtemail");
        }
        if (telefone == "") {
            listaErros.push("ttelefone");
        }
        if (cpf == "") {
            listaErros.push("tcpf");
        }

        if (listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nometxt: nome,
                txtemail: email,
                ttefone: telefone,
                txtcpf: cpf,
                opcao1: op
            }

            fetch("/send/doacao", {
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