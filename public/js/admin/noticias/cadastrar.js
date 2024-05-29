console.log(`entrou noticia`)

document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnGravar");

    btnGravar.addEventListener("click", gravarNoticia);

    //var inputImagem = document.getElementById("inputImagem");

    //inputImagem.addEventListener("change", exibirPreviaImagem);
})

/*function exibirPreviaImagem() {

    let file = document.getElementById("inputImagem").files[0];

    if(file.type.includes("png") || 
    file.type.includes("jpg") || 
    file.type.includes("jpeg")) {
        let url = URL.createObjectURL(file);

        document.getElementById("previaImagem").setAttribute("src", url);
    }
    else{
        alert("Imagem inválida!!!");
    }
}*/

function gravarNoticia() {

    debugger
    var tituloNoticia = document.getElementById("titulo");
    var noticiaDescricao = document.getElementById("descricao");
    var noticiaConteudo = document.getElementById("conteudo");
    

    //if de validação básica
    if(tituloNoticia.value != "" && 
    noticiaDescricao.value != "" && 
    noticiaConteudo.value != "" )
    {

        let obj = {

        titulo : tituloNoticia.value,
        descricao : noticiaDescricao.value,
        conteudo : noticiaConteudo.value
    }

        fetch('/admin/noticias/adminCadastrar', {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Noticia cadastrada!");
            }
            else{
                alert("Erro ao criar noticia");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Preencha todos os campos corretamente!");
        return;
    }
}