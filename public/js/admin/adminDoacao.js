document.addEventListener("DOMContentLoaded", function () {
    CarregarTabela();

    var Tabela = document.querySelector("#Tabela");
    var Paginas = document.querySelector("#paginas");

    async function CarregarTabela() {
        let dadosTabela = await BuscarTabela();


        if (dadosTabela.ok) {
            let lista = `
        <thead>
            <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Nome</th>
                <th scope="col">Valor</th>
                <th scope="col">Status</th>
                <th scope="col">Data</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody id="conteudo">`;
            //Carregar o conteudo da lista para monta-lá
            for (let i = 0; i < dadosTabela.item.length; i++) {
                lista += `
            <tr id="${dadosTabela.item[i].id}">
                <td scope="row">
                    ${dadosTabela.item[i].tipo}
                </td>
                <td>
                    ${dadosTabela.item[i].nome}
                </td>
                <td>
                    ${dadosTabela.item[i].valor}
                </td>
                <td>
                ${dadosTabela.item[i].status}

                </td>
                <td>
                    ${dadosTabela.item[i].data}
                </td>
                <td>
                <div>
                    <button class="btn btn-primary btnEditar">
                    <i id="1" class="fas fa-pen"></i>
                    </button>
                    <button data-codigoexclusao="<%= listagemDoacao[i].doa_id %>" class="btn btn-danger btnExcluir"
                    id=""><i class="fas fa-trash"></i>
                    </button>
                </div>
                </td>
            </tr>`;
            }
            lista += `</tbody>`;

            Tabela.innerHTML = lista;
            CarregarPaginas(1,dadosTabela.status);
            CarregarNovosConteudos();
        }
    }


    function CarregarPaginas(numPag = 1, status ="disponivel") {

        let desabilitaC = status == "comeco"? "disabled":"";
        let desabilitaF = status == "fim" ? "disabled":"";
            Paginas.innerHTML = `
        <button id="btn_voltaDez" data-quant="-10" type="button" class="btn btn-outline-dark" ${desabilitaC}>&lt;&lt;</button>
        <button id="btn_voltaUm" data-quant="-1" type="button" class="btn btn-outline-dark"  ${desabilitaC}>&lt;</button>
        <button id="btn_atual" data-pagina="${numPag}" type="button" class="btn btn-outline-dark" disabled>${numPag}</button>
        <button id="btn_andaUm" data-quant="1" type="button" class="btn btn-outline-dark" ${desabilitaF}>&gt;</button>
        <button id="btn_andaDez" data-quant="10" type="button" class="btn btn-outline-dark" ${desabilitaF}>&gt;&gt;</button>
        `;
    }

    async function BuscarTabela(intervalo = 1) {

        return fetch("/admin/doacao/tabela/" + intervalo)
            .then(r => {
                return r.json();
            })
            .then(r => {
                console.log(r)
                return r;
            })
    }

    function CarregarNovosConteudos() {
        var Conteudo = document.querySelector("#conteudo");
        // var Paginas = document.querySelector("#paginas");
        let BotaoEditar = document.querySelectorAll(".btnEditar");
        let BotaoExcluir = document.querySelectorAll(".btnExcluir");


        // var btn_atual = document.querySelector("#btn_atual");
        // var btn_voltaDez = document.querySelector("#btn_voltaDez");
        // var btn_voltaUm = document.querySelector("#btn_voltaUm");
        // var btn_andaUm = document.querySelector("#btn_andaUm");
        // var btn_andaDez = document.querySelector("btn_andaDez");

        // btn_voltaDez.addEventListener("click", MenosAtualizaLista);
        // btn_voltaUm.addEventListener("click", MenosAtualizaLista);
        // btn_andaDez.addEventListener("click", MaisAtualizaLista);
        // btn_andaUm.addEventListener("click", MaisAtualizaLista);



        for (let i = 0; i < BotaoEditar.length; i++) {
            BotaoEditar[i].addEventListener("click", Editar);
        }
    }


    async function Editar() {
        let idAlterar = this.parentElement.parentElement.parentElement.id


        let informacao = await BuscarBanco(idAlterar);
        let linha = document.getElementById(idAlterar);

        linha.innerHTML = `
            <td scope="row">
                <select id="select-${informacao.Id}">
                    <option value = "1" selected>${informacao.Tipo}</option>
                    <!--Renderizar os tipos de doação-->
            </td>
            <td>
                <input type="text" id="nome-${informacao.Id}" value="${informacao.Nome}">
            </td>
            <td>
                <input type="number" id="valor-${informacao.Id}" value="${informacao.Valor}">
            </td>
            <td>
                <input type="text" id="status-${informacao.Id}" value="${informacao.Status}">
            </td>
            <td>
                <input type="text" value="${informacao.Data}" disabled>
            </td>

            <td>
                <div>
                <button data-id="${informacao.Id}" class="btn btn-success btnSalvar">
                    <i id="1" class="fa fa-check"></i>
                </button>
                <button class="btn btn-danger btnCancelar"
                    id="cancelar-${informacao.Id}"><i class="fa fa-times" aria-hidden="true"></i>
                </button>
                </div>
        </td>
        `;
        // Carregar botão de salvar ou cancelar a operação
        carregarNovosBotao();
    }

    function carregarNovosBotao() {
        let btnSalvar = document.querySelectorAll(".btnSalvar");
        let btnCancelar = document.querySelectorAll(".btnCancelar");

        for (let i = 0; i < btnSalvar.length; i++) {
            btnSalvar[i].addEventListener("click", SalvarAlteracao);
            btnCancelar[i].addEventListener("click", CancelarAlteracao);
        }
    }

    function SalvarAlteracao() {
        let id = this.dataset.id

        let inputNome = document.getElementById(`nome-${id}`);
        let inputTipo = document.getElementById(`select-${id}`);
        let inputStatus = document.getElementById(`status-${id}`);
        let inputValor = document.getElementById(`valor-${id}`);

        if (inputNome.value != "" && inputTipo.value > 0 && inputStatus.value != '' && inputValor.value > 0) {

            let obj = {
                id: id,
                nome: inputNome.value,
                tipo: inputTipo.value,
                status: inputStatus.value,
                valor: inputValor.value
            }
            fetch("/admin/doacao/alterar", {
                method: "POST",
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(r => {
                    return r.json();

                })
                .then(r => {
                    if (r.ok) {
                        alert(r.msg);
                    }
                    else {
                        alert(r.msg);
                    }
                })
        } else {
            alert("Dados Faltando ou incorreto!");
        }
        CancelarAlteracao();
    }

    function CancelarAlteracao() {

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
    function MenosAtualizaLista() {

    }

    function MaisAtualizaLista() {

    }


    function AtualizarLista(numero) {

    }


})