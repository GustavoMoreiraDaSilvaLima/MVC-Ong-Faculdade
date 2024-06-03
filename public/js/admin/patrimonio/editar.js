/*document.addEventListener("DOMContentLoaded", function() {


    var btnAlterar = document.getElementById("btnEditar");


    btnAlterar.addEventListener("click", function() {
        editarPatrimonio();
    })
})

function editarPatrimonio() {

    //limparErros();
    
    var patrimonioCodItem = document.getElementById("NovoCoditem").value;
    var patrimonioNome = document.getElementById("NovoNome").value;
    var patrimonioQuantidade = document.getElementById("NovaQuantidade").value;
    var patrimonioDescricao = document.getElementById("NovaDescricao").value;
    var patrimonioStatus = document.getElementById("NovoStatus").value;

    var listaErros = [];

    console.log(patrimonioDescricao)
    if(patrimonioCodItem == "" || patrimonioCodItem == undefined || patrimonioCodItem == null){
        listaErros.push("NovoCoditem");
    }
    
    if(patrimonioNome == "" || patrimonioNome == undefined || patrimonioNome == null){
        listaErros.push("NovoNome");
    }

    if(patrimonioQuantidade == "" || patrimonioQuantidade == undefined || patrimonioQuantidade == null){
        listaErros.push("NovaQuantidade");
    }
    if(patrimonioDescricao == "" || patrimonioDescricao == undefined || patrimonioDescricao == null){
        listaErros.push("NovaDescricao");
    }
    if(patrimonioStatus == "" || patrimonioStatus == undefined || patrimonioStatus == null){
        listaErros.push("NovoStatus");
    }

   
    if(listaErros.length == 0){

        
        let formData = new FormData();

        formData.append("NovoCoditem", patrimonioCodItem);
        formData.append("NovoNome", patrimonioNome);
        formData.append("NovaQuantidade", patrimonioQuantidade);
        formData.append("NovaDescricao", patrimonioDescricao);
        formData.append("NovoStatus", patrimonioStatus);

        fetch('/admin/patrimonio/adminEditar', { 
            method: "POST",
            body: formData
        })
        .then(r=> {
            return r.json();
            
        })
        .then(r=> {          
            if(r.ok) {
                alert("Patrimônio alterado!");
                window.location.href="/admin/patrimonio";
            }
            else{
                alert("Erro ao alterar patrimônio");
            }
        })
        .catch(e=> {
            console.log(e);
        })

    }

} */