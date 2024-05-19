document.addEventListener("DOMContentLoaded", function () {

    var BotaoEditar = document.querySelectorAll(".btnEditar");
    var BotaoExcluir = document.querySelectorAll(".btnExcluir")

    for (let i = 0; i < BotaoEditar.length; i++) {
        BotaoEditar[i].addEventListener("click", Editar);
    }

    async function Editar() {
        let idAlterar = this.parentElement.parentElement.parentElement.id


        let informacao = await BuscarBanco(idAlterar);
        let linha = document.getElementById(idAlterar);
        console.log(informacao);
        console.log(idAlterar);

        linha.innerHTML = `
            <td scope="row">
                <select>
                    <option value = "1" selected>${informacao.Tipo}</option>
                    <!--Renderizar os tipos de doação-->
            </td>
            <td>
                <input type="text" value="${informacao.Nome}">
            </td>
            <td>
                <input type="number" value="${informacao.Valor}">
            </td>
            <td>
                <input type="text" value="${informacao.Status}">
            </td>
            <td>
                <input type="text" value="${informacao.Data}" disabled>
            </td>

            <td>
                <div>
                <button class="btn btn-success btnSalvar">
                    <i id="1" class="fa fa-check"></i>
                </button>
                <button data-codigoexclusao="<%= listagemDoacao[i].doa_id %>" class="btn btn-danger btnExcluir"
                    id=""><i class="fa fa-times" aria-hidden="true"></i>
                </button>
                </div>
        </td>
        `;
        console.log(idAlterar);
        // Carregar botão de salvar ou cancelar a operação
        carregarNovosBotao()
    }

    function carregarNovosBotao(){

    }


    function BuscarBanco(id) {
        return fetch("/admin/doacao/alterar/search/" + id)
            .then(r => {
                return r.json();
            })
            .then(r => {
                return r;
            })
            
    }
    function MenosAtualiza() {

    }

    function MaisAtualiza() {

    }


    function AtualizarLista(numero) {

    }


})