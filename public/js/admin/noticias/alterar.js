document.addEventListener("DOMContentLoaded", function() {


    var btnAlterar = document.getElementById("btnAlterar");


    btnAlterar.addEventListener("click", function() {
        alterarNoticia();
    })
})

function alterarNoticia() {
    console.log("entrou");

    //limparErros();
    
    var noticiaTitulo = document.getElementById("novoTitulo").value;
    var noticiaDescricao = document.getElementById("novaDescricao").value;
    var noticiaConteudo = document.getElementById("novoConteudo").value;
    var noticiaId = document.getElementById("idNoticia").value;

    var listaErros = [];

    console.log(noticiaTitulo)
    if(noticiaTitulo == "" || noticiaTitulo == undefined || noticiaTitulo == null){
        listaErros.push("novoTitulo");
    }
    
    if(noticiaDescricao == "" || noticiaDescricao == undefined || noticiaDescricao == null){
        listaErros.push("novaDescricao");
    }

    if(noticiaConteudo == "" || noticiaConteudo == undefined || noticiaConteudo == null){
        listaErros.push("novoConteudo");
    }
    if(noticiaId == "" || noticiaId == undefined || noticiaId == null){
        listaErros.push("idNoticia");
    }

   
    if(listaErros.length == 0){

        var data = {
            titulo: noticiaTitulo,
            descricao: noticiaDescricao,
            conteudo: noticiaConteudo,
            id: noticiaId,
        };

        fetch('/admin/noticias/adminAlterar', { 
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {          
  
        })
        .catch(e=> {
            console.log(e);
        })

    }

}

    /*function mostrarErros(lista) {
        for(var i = 0; i<lista.length; i++){
            let id = lista[i];

            document.getElementById(id).classList.add("campoErro");

            document.getElementById("erros").innerText = "Preencha corretamente os campos destacados abaixo:";

            document.getElementById("erros").style= "display:block";
        }
    }

    function limparErros() {
        document.getElementById("inputNome").classList.remove("campoErro");
        document.getElementById("inputEmail").classList.remove("campoErro");
        document.getElementById("inputSenha").classList.remove("campoErro");
        document.getElementById("inputConfSenha").classList.remove("campoErro");
        document.getElementById("selPerfil").classList.remove("campoErro");

        document.getElementById("erros").style = "display:none";
        document.getElementById("alertaSucesso").style = "display:none";*/
    