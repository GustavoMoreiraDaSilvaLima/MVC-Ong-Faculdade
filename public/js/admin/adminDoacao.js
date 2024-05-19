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
                    <button data-codigoexclusao="${dadosTabela.item[i].id}" class="btn btn-danger btnExcluir"
                    id=""><i class="fas fa-trash"></i>
                    </button>
                </div>
                </td>
            </tr>`;
            }
            lista += `</tbody>`;

            Tabela.innerHTML = lista;
            CarregarPaginas(1, dadosTabela.status);
            CarregarNovosConteudos();
        }
    }


    function CarregarPaginas(numPag = 1, status = "disponivel") {


        if (numPag < 0) {
            numPag = 1;
        }

        let desabilitaC = status == "fim" ? "'btn btn btn-outline-danger btnAtualizador' disabled" :status == "comeco" ? "'btn btn btn-outline-danger btnAtualizador' disabled" : status == "erro tabela" ? "'btn btn btn-outline-danger btnAtualizador' disabled" : "'btn btn-outline-primary btnAtualizador'";
        let desabilitaF = status == "fim" ? "'btn btn btn-outline-danger btnAtualizador' disabled" : status == "erro tabela" ? "'btn btn-outline-danger btnAtualizador' disabled":"'btn btn-outline-primary btnAtualizador'";
        let desabilitaFim = status == "fim" ? "'btn btn btn-outline-danger btnAtualizador' disabled" : status == "erro tabela" ? "'btn btn-outline-danger btnAtualizador' disabled" : "'btn btn-outline-primary btnAtualizador'";
        Paginas.innerHTML = `
                <button data-quant="-10" type="button" class=${desabilitaC}>&lt;&lt;</button>
                <button  data-quant="-1" type="button" class=${desabilitaC}>&lt;</button>
                <button id="btn_atual" data-pagina="${numPag}" type="button" class="btn btn-outline-dark">${numPag}</button>
                <button data-quant="1" type="button" class=${desabilitaF}>&gt;</button>
                <button data-quant="10" type="button" class=${desabilitaFim}>&gt;&gt;</button>
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

        // var Paginas = document.querySelector("#paginas");
        let BotaoEditar = document.querySelectorAll(".btnEditar");
        let BotaoExcluir = document.querySelectorAll(".btnExcluir");
        let BotaoPagina = document.querySelectorAll(".btnAtualizador");

        for (let i = 0; i < BotaoPagina.length; i++) {
            BotaoPagina[i].addEventListener("click", AtualizarTabela);
        }



        for (let i = 0; i < BotaoEditar.length; i++) {
            BotaoEditar[i].addEventListener("click", Editar);
            BotaoExcluir[i].addEventListener("click", Excluir);
        }
    }
    function Excluir() {
        let id = this.dataset.codigoexclusao;
        if (confirm("Tem certeza que deseja excluir esta doação?")) {
            if (id != '') {
                let obj = {
                    id: id
                }
                fetch("/admin/doacao/excluir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj)
                })
                .then(r=> {
                    return r.json();
                })
                .then(r=>{
                    if(r.ok){
                        alert(r.msg);
                        CancelarAlteracao();
                    }else{
                        alert(r.msg);
                    }
                })
            }
        }
    }

    async function Editar() {
        let idAlterar = this.parentElement.parentElement.parentElement.id


        let informacao = await BuscarBanco(idAlterar);
        let linha = document.getElementById(idAlterar);

        linha.innerHTML = `
            <td scope="row">
                <select class="form-control" id="select-${informacao.Id}"style="width: 70px;">
                    <option value = "1" selected>${informacao.Tipo}</option>
                    <!--Renderizar os tipos de doação-->
            </td>
            <td>
                <input type="text" class="form-control" id="nome-${informacao.Id}" value="${informacao.Nome}" placeholder="Doador">
            </td>
            <td>
                <input type="number" class="form-control" id="valor-${informacao.Id}" value="${informacao.Valor}" placeholder="Valor">
            </td>
            <td>
                <input type="text" class="form-control" id="status-${informacao.Id}" value="${informacao.Status}" placeholder="Status da Transação">
            </td>
            <td>
                <input type="text" class="form-control" value="${informacao.Data}" disabled>
            </td>

            <td>
                <div>
                <button data-id="${informacao.Id}" class="btn btn-success btnSalvar">
                    <i id="1" class="fa fa-check"></i>
                </button>
                <button class="btn btn-danger btnCancelar"
                    id="cancelar-${informacao.Id}" ><i class="fa fa-times" aria-hidden="true"></i>
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
                        CancelarAlteracao();
                    }
                    else {
                        alert(r.msg);
                    }
                })
        } else {
            alert("Dados Faltando ou incorreto!");
        }

    }

    function CancelarAlteracao() {
        AtualizarTabela(0);
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
    async function AtualizarTabela(quantidade = 1) {
        if (quantidade != 0) {
            quantidade = this.dataset.quant;
        }
        let atual = document.querySelector("#btn_atual").dataset.pagina;
        let NovaPagina = parseInt(atual) + parseInt(quantidade);
        let Tabela_att = await BuscarTabela(NovaPagina);
        if (Tabela_att.status == "erro tabela") {
            NovaPagina = parseInt(atual);
        }


        CarregarPaginas(NovaPagina, Tabela_att.status);
        AtualizaTd(Tabela_att.item, Tabela_att.status);
        CarregarNovosConteudos()

    }

    function AtualizaTd(item, disponibilidade = "disponivel") {

        if (disponibilidade != "erro tabela") {
            let Conteudo = document.querySelector("#conteudo");
            let TabelaNova = "";
            for (let i = 0; i < item.length; i++) {
                TabelaNova += `
                <tr id="${item[i].id}">
                <td scope="row">
                    ${item[i].tipo}
                </td>
                <td>
                    ${item[i].nome}
                </td>
                <td>
                    ${item[i].valor}
                </td>
                <td>
                ${item[i].status}

                </td>
                <td>
                    ${item[i].data}
                </td>
                <td>
                <div>
                    <button class="btn btn-primary btnEditar">
                    <i id="1" class="fas fa-pen"></i>
                    </button>
                    <button data-codigoexclusao="${item[i].id}" class="btn btn-danger btnExcluir"
                    id=""><i class="fas fa-trash"></i>
                    </button>
                </div>
                </td>
            `
            }
            Conteudo.innerHTML = TabelaNova;
        }

    }




})