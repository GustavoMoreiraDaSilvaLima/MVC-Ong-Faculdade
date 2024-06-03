
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("quantidade").style["border-color"] = "#ced4da";
        document.getElementById("descricao").style["border-color"] = "#ced4da";
        document.getElementById("status").style["border-color"] = "#ced4da";
    }

    var inputImagem = document.getElementById("inputImagem");

    inputImagem.addEventListener("change", exibirPreviaImagem);

    function exibirPreviaImagem() {

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
    }
    
    function cadastrar() {
        limparValidacao();
        debugger
        let id = document.getElementById("id");
        let coditem = document.getElementById("coditem");
        let nome = document.getElementById("nome");
        let quantidade = document.getElementById("quantidade");
        let descricao = document.getElementById("descricao");
        let status = document.getElementById("status");
        var arquivos = document.getElementById("inputImagem").files;

        let listaErros = [];
        if(coditem.value < 0) {
            listaErros.push("coditem");
        }
        if(nome.value == "") {
            listaErros.push("nome");
        }
        if(quantidade.value < 0){
            listaErros.push("quantidade")
        }
        if(descricao.value == "") {
            listaErros.push("descricao");
        }
        if(status.value == "") {
            listaErros.push("status");
        }
        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let formData = new FormData();
            
            formData.append("id", id.value);
            formData.append("coditem", coditem.value);
            formData.append("nome", nome.value);
            formData.append("quantidade", quantidade.value);
            formData.append("descricao", descricao.value);
            formData.append("status", status.value);
            formData.append("imagem", arquivos[0]);



            fetch("/admin/patrimonio/adminEditar", {
                method: 'POST',
                body: formData
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