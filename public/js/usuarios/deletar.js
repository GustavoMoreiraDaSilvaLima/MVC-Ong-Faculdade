document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnDeletar").addEventListener("click", deletar);


        function deletar() {

            let id = document.querySelector("#usuarioId").value;
            let obj = {
                id: id,
            }
            let listaErros = [];
            if(listaErros.length == 0) {

                fetch("/usuarios/exclusao", {
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
                        window.location.href="/usuarios";
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
                alert("Preencha corretamente os campos indicados!");
            }
        }

    })