document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("butao_pedido").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("cpf").style["border-color"] = "#ced4da";
        document.getElementById("email").style["border-color"] = "#ced4da";
        document.getElementById("telefone").style["border-color"] = "#ced4da";
        document.getElementById("sobre_voce").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#nome").value;
        let cpf = document.querySelector("#cpf").value;
        let esc = document.querySelector("#esc").value;
        let email = document.querySelector("#email").value;
        let telefone = document.querySelector("#telefone").value;
        let sobre_voce = document.querySelector("#sobre_voce").value;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("nome");
        }
        if(cpf == ""){
            listaErros.push("cpf")
        }
        if(email == "") {
            listaErros.push("email");
        }
        if(telefone == "") {
            listaErros.push("telefone");
        }
        if(sobre_voce == "") {
            listaErros.push("sobre_voce");
        }

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                esc:esc,
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: telefone,
                sobre_voce: sobre_voce
            }

            fetch("/seja_um_voluntario", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    alert(r.msg)
                    window.location.href="/";
                    
                }   
                else {
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o preenchimento incorreto
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos!");
        }
    }

})