document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirProduto);
    }
    
})

function excluirProduto() {
    var codigo = this.dataset.codigo;
    if(confirm("Tem certeza que deseja excluir")) {
        if(codigo != ""){
            var data = {
                codigo: codigo
            }
            fetch("/admin/produto/deletar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(r=> {
                return r.json(); 
            })
            .then(r=> {
                if(r.ok){
                    window.location.reload();
                }
                else{
                    alert("Erro ao excluir produto");
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

}