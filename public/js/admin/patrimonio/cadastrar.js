
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("quantidade").style["border-color"] = "#ced4da";
        document.getElementById("descricao").style["border-color"] = "#ced4da";
        document.getElementById("status").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#nome").value;
        let quantidade = document.getElementById("quantidade").value;
        let descricao = document.querySelector("#descricao").value;
        let status = document.querySelector("#status").value;

        let listaErros = [];
        if(nome == "") {
            listaErros.push("nome");
        }
        if(quantidade < 0){
            listaErros.push("quantidade")
        }
        if(descricao == "") {
            listaErros.push("descricao");
        }
        if(status == "") {
            listaErros.push("status");
        }
        if(listaErros.length == 0) {
            //enviar ao backend com fetch
            
            let obj = {
        
                nome: nome,
                quantidade: quantidade,
                descricao: descricao,
                status: status
            }

            fetch("/admin/patrimonio/adminCadastrar", {
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
                    window.location.href="/admin/patrimonio";
                    
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