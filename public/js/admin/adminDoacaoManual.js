document.addEventListener("DOMContentLoaded", function () {

    var btnCadastrar = document.getElementById("btnCadastrar");

    btnCadastrar.addEventListener("click", Enviar);
    console.log("CARREGUEI")


})

function Enviar() {
    Forma = document.getElementById("DoaForma");
    Status = document.getElementById("DoaStatus");
    Usuario = document.getElementById("DoaUsuario");
    Valor = document.getElementById("DoaValor");

    if (Forma.value != 0 && Status.value != 0 && Usuario.value != 0 && Valor.value > 0) {
        let obj = {
            forma: Forma.value,
            status: Status.value,
            usuario: Usuario.value,
            valor: Valor.value
        }

        fetch('/admin/doacao/nova', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(r => {
                return r.json();
            })
            .then(r => {
                if (r.ok) {
                    alert("Doação Cadastrada!");
                }
                else {
                    alert("Erro ao cadastrar a Doação");
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

}