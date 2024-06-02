document.addEventListener("DOMContentLoaded", function () {

    var btnAlterar = document.getElementById("btnAlterar");

    btnAlterar.addEventListener("click", Alterar);

    var inputImagem = document.getElementById("eventImage");

    inputImagem.addEventListener("change", exibirPreviaImagem);

    var btnAlterar = document.getElementById("btnAlterarView");

    btnAlterar.addEventListener("click", AlterarPagina);

    var EventoId = document.getElementById("inputId");




    function exibirPreviaImagem() {

        let file = document.getElementById("eventImage").files[0];

        if (file.type.includes("png") ||
            file.type.includes("jpg") ||
            file.type.includes("jpeg")) {
            let url = URL.createObjectURL(file);

            document.getElementById("previaImagem").setAttribute("src", url);
        }
        else {
            alert("Imagem inválida!!!");
        }
    }

    
    function Alterar() {
        limparValidacao();
        let nomeEvento = document.getElementById("eventName");
        let descEvento = document.getElementById("eventDescription");
        let localEvento = document.getElementById("eventLocation");
        let horaIniEvento = document.getElementById("eventStartTime");
        let duraEvento = document.getElementById("eventDuration");
        let dataEvento = document.getElementById("eventDate");
        let arquivos = document.getElementById("eventImage").files;
        let idEvento = document.getElementById("inputId");

        console.log(arquivos[0])
        let hoje = FormatarDataAtual();
        let listaErros = [];
        if (idEvento.value == '' || idEvento.value <= 0) {
            listaErros.push("inputId");
        }
        if (nomeEvento.value == '') {
            listaErros.push("eventName");
        }
        if (descEvento.value == '') {
            listaErros.push("eventDescription");
        }
        if (localEvento.value == '') {
            listaErros.push("eventLocation");
        }
        if (!horaIniEvento.value) {
            listaErros.push("eventStartTime");
        }
        if (!duraEvento.value || duraEvento.value < 0 || duraEvento.value > 23) {
            listaErros.push("eventDuration");
        }
        if (dataEvento.value <= hoje) {
            listaErros.push("eventDate");
        }

        if (listaErros.length == 0) {


            let formData = new FormData();

            formData.append("id", idEvento.value);
            formData.append("nome", nomeEvento.value);
            formData.append("descricao", descEvento.value);
            formData.append("local", localEvento.value);
            formData.append("inicio", horaIniEvento.value);
            formData.append("duracao", duraEvento.value);
            formData.append("data", dataEvento.value);
            formData.append("imagem", arquivos[0]);



            fetch('/admin/eventos/alterar', {
                method: "POST",
                body: formData
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        alert(r.msg);

                    } else {
                        alert(r.msg)
                    }
                })
                .catch(e => {
                    console.log(e);
                })


        }
        else {
            for (let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

    function limparValidacao() {
        document.getElementById("eventName").style["border-color"] = "#ced4da";
        document.getElementById("eventDescription").style["border-color"] = "#ced4da";
        document.getElementById("eventLocation").style["border-color"] = "#ced4da";
        document.getElementById("eventStartTime").style["border-color"] = "#ced4da";
        document.getElementById("eventDuration").style["border-color"] = "#ced4da";
        document.getElementById("eventDate").style["border-color"] = "#ced4da";
    }


    function FormatarDataAtual() {
        let hoje = new Date();
        let dia = hoje.getDate();
        let mes = hoje.getMonth() + 1;
        let ano = hoje.getFullYear();
        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }

        hoje = `${ano}-${mes}-${dia}`;
        return hoje;
    }


    //Alteração da pagina  
    function AlterarPagina() {
        let tudo = document.getElementById("AlterarComeco");
        let conteudo = document.getElementById("alterarConteudo");
        var ListaProdutos = [];
        var ListaPatrimonio = [];
        var posicao = [];
        var posicaoPatrimonio = []
        let htmlCima = `

        <div class="row">
            <div class="col-12 text-center">
                <a class="btn btn-outline-danger" href="/admin/eventos/alterar/${EventoId.value}">Voltar a editar</a>
                <h1 class="display-4">Escolha qual saida deseja lançar</h1>
                <button id="btnAlterarProduto" class="btn btn-outline-dark btn-lg">Produto</button>
                <button id="btnAlterarPatrimonio" class="btn btn-outline-dark btn-lg">Patrimonio</button>
            </div>
        </div>
    `;
        let htmlConteudo = `
    
    `;
        //Botão de Produto e patrimonio
        renderizarPagina();
        CarregarBotao();



        async function PatrimonioView() {
            htmlCima = `
                <div class="row">
                    <div class="col-12 text-center">
                        <a class="btn btn-outline-danger" href="/admin/eventos/alterar/${EventoId.value}">Voltar a editar</a>
                        <h1 class="display-4">Escolha qual saida deseja lançar</h1>
                        <button id="btnAlterarProduto" class="btn btn-outline-dark btn-lg">Produto</button>
                        <button id="btnAlterarPatrimonio" class="btn btn-dark btn-lg">Patrimonio</button>
                    </div>
                </div>
                    `;

            // /admin/patrimonio
            ListaPatrimonio = await Buscar("patrimonio");

            //HTML a ser feito
            htmlConteudo =
                `
                    <div>
                        <h1 class="text-center">Lista Adicionados</h1>
                        <div id="Itens">
        
                        </div>
                        <div class="table-responsive">
                            <h1>Lista de itens</h1>
                            <div>
                            <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Imagem</th>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Quantidade</th>
                                    <th>Status</th>
                                    <th>Descricao</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            `;
            console.log(ListaPatrimonio)
            //Comando de imagem quando tiver pois esta dando erro quando não vem ${ListaPatrimonio.item[i].patrimonioImg}
            for (let i = 0; i < ListaPatrimonio.item.length; i++) {
                htmlConteudo += `
                            <tr>
                                <td><img src="/img/evento/sem-foto.png" width="80"></td>
                                <td>${ListaPatrimonio.item[i].patrimonioid}</td>
                                <td>${ListaPatrimonio.item[i].patrimonioNome}</td>
                                <td>${ListaPatrimonio.item[i].patrimonioQuantidade}</td>
                                <td>${ListaPatrimonio.item[i].patrimonioStatus}</td>
                                <td>${ListaPatrimonio.item[i].patrimonioDescricao}</td>
                                <td><button class="btnAdicionarPatrimonio btn btn-outline-success" data-id="${ListaPatrimonio.item[i].patrimonioid}" data-posicao="${i}">Adicionar</button></td>
                            </tr>
                            
                            `
            }



            htmlConteudo += `
                            </tbody>
                            </div>
                        </div>
        
        
        
                    </div>
        
                `


            //Final
            renderizarPagina();
            CarregarListaPatrimonio();
        }

        async function ProdutoView() {
            htmlCima = `
        <div class="row">
            <div class="col-12 text-center">
                <a class="btn btn-outline-danger" href="/admin/eventos/alterar/${EventoId.value}">Voltar a editar</a>
                <h1 class="display-4">Escolha qual saida deseja lançar</h1>
                <button id="btnAlterarProduto" class="btn btn-dark btn-lg">Produto</button>
                <button id="btnAlterarPatrimonio" class="btn btn-outline-dark btn-lg">Patrimonio</button>
            </div>
        </div>
    `;
            // /admin/produto
            ListaProdutos = await Buscar("produto");

            //HTML a ser feito
            htmlConteudo =
                `
            <div>
                <h1 class="text-center">Lista Adicionados</h1>
                <div id="Itens">

                </div>
                <div class="table-responsive">
                    <h1>Lista de itens</h1>
                    <div>
                    <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    `;
            console.log(ListaProdutos)
            for (let i = 0; i < ListaProdutos.item.length; i++) {
                htmlConteudo += `
                    <tr>
                        <td><img src="${ListaProdutos.item[i].produtoImagem}" width="80"></td>
                        <td>${ListaProdutos.item[i].produtoId}</td>
                        <td>${ListaProdutos.item[i].produtoNome}</td>
                        <td>${ListaProdutos.item[i].produtoQuantidade}</td>
                        <td>${ListaProdutos.item[i].categoriaNome}</td>
                        <td>${ListaProdutos.item[i].marcaNome}</td>
                        <td><button class="btnAdicionar btn btn-outline-success" data-id="${ListaProdutos.item[i].produtoId}" data-posicao="${i}">Adicionar</button></td>
                    </tr>
                    
                    `


            }



            htmlConteudo += `
                    </tbody>
                    </div>
                </div>



            </div>

        `


            //Final
            renderizarPagina();
            CarregarListaProduto()
        }

        async function Buscar(Filtro) {
            return fetch(`/admin/${Filtro}/listaCompleta`)
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    console.log(r)
                    return r;
                })
        }



        function renderizarPagina() {
            tudo.innerHTML = htmlCima;
            conteudo.innerHTML = htmlConteudo;
            CarregarBotao();

        }


        function CarregarBotao() {
            let btnAlterarPatrimonio = document.getElementById("btnAlterarPatrimonio");
            let btnAlterarProduto = document.getElementById("btnAlterarProduto");
            let btnAdicionar = document.querySelectorAll(".btnAdicionar");
            let btnAdicionarPatrimonio = document.querySelectorAll(".btnAdicionarPatrimonio");


            for (let i = 0; i < btnAdicionar.length; i++) {
                btnAdicionar[i].addEventListener("click", AdicionarItemProduto);
            }

            for (let i = 0; i < btnAdicionarPatrimonio.length; i++) {
                btnAdicionarPatrimonio[i].addEventListener("click", AdicionarItemPatrimonio);
            }


            btnAlterarPatrimonio.addEventListener("click", PatrimonioView);
            btnAlterarProduto.addEventListener("click", ProdutoView);

        }

        function CarregarListaPatrimonio(){
            let ListaItens = document.getElementById("Itens");
            let BotaoAdd = document.querySelectorAll(".btnAdicionarPatrimonio");


            for (let i = 0; i < BotaoAdd.length; i++) {
                BotaoAdd[i].disabled = false;
                for (let j = 0; j < posicaoPatrimonio.length; j++) {
                    if (BotaoAdd[i].dataset.posicao == posicaoPatrimonio[j]) {
                        BotaoAdd[i].disabled = true;
                    }
                }

            }



            let html = `                
        <table class="table table-striped table-hover">
            <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Quantidade(Disponivel)</th>
                <th>Quantidade a ser levada</th>
                <th>Remover</th>
            </tr>
            <tbody class="">`;
            //${ListaPatrimonio.item[i].patrimonioImg} Imagem a ser alterada quando vir do banco de dados

            for (let i = 0; i < posicaoPatrimonio.length; i++) {

                html += `
            <tr data-idpatrimonioEnviar=${ListaPatrimonio.item[posicaoPatrimonio[i]].patrimonioid}>
                <td><img src="/img/evento/sem-foto.png" width="80"></td>
                <td>${ListaPatrimonio.item[posicaoPatrimonio[i]].patrimonioNome}</td>
                <td data-quantidade="${ListaPatrimonio.item[posicaoPatrimonio[i]].patrimonioQuantidade}">${ListaPatrimonio.item[posicaoPatrimonio[i]].patrimonioQuantidade}</td>
                <td><input class="form-control quantidade" type="number" placeholder="Coloque a quantidade" value="1"></td>
                <td><button data-codigoremover="${ListaPatrimonio.item[posicaoPatrimonio[i]].patrimonioid}" data-codigoposicao="${posicaoPatrimonio[i]}" class="btn btn-danger btnExcluir"><i class="fas fa-trash"></i></td>
            </tr>       
            `
            }
            html += `
                </tbody>
            </table>
            <button id="btnEnviar" class="btn btn-outline-primary">Enviar Produtos</button>
        `

            ListaItens.innerHTML = html;

            let btnExcluir = document.querySelectorAll(".btnExcluir");
            for (let i = 0; i < btnExcluir.length; i++) {
                btnExcluir[i].addEventListener("click", ExcluirPatrimonio)
            }

            let btnEnviar = document.getElementById("btnEnviar");
            btnEnviar.addEventListener("click", EnviarPatrimonio);

            let inputQuantidade = document.querySelectorAll(".quantidade");
            for (let i = 0; i < inputQuantidade.length; i++) {
                inputQuantidade[i].addEventListener("input", VerificaValor);
            }
        }

        function ExcluirPatrimonio(){
            console.log(this.dataset.codigoposicao)
            let posicaoRemover = posicaoPatrimonio.indexOf(this.dataset.codigoposicao);
            if (posicaoRemover > -1) {
                posicaoPatrimonio.splice(posicaoRemover, 1);
            }
            CarregarListaPatrimonio();
        }

        function AdicionarItemPatrimonio(){
            let id = this.dataset.id;
            this.disabled = true
            let busca = true;
            for (let i = 0; i < posicaoPatrimonio.length; i++) {
                if (posicaoPatrimonio[i] == this.dataset.posicao) {
                    busca = false
                }
            }
            if (busca == true) {
                posicaoPatrimonio.push(this.dataset.posicao);
            }
            CarregarListaPatrimonio();
        }
        
        function EnviarPatrimonio(){
            let idProduto = document.querySelectorAll('[data-idpatrimonioEnviar]');
            let quantidade = document.querySelectorAll(".quantidade");
            let listaEnvio = [];
            let listaQuantidade = [];
            for (let i = 0; i < idProduto.length; i++) {
                listaEnvio.push(idProduto[i].dataset.idpatrimonioenviar);
                listaQuantidade.push(quantidade[i].value);
            }

            let obj = {
                id: EventoId.value,
                idPatrimonio: listaEnvio,
                quantidadePatrimonio: listaQuantidade
            }
            fetch('/admin/eventos/saidaEvento/patrimonio', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        alert(r.msg);
                        ProdutoView();
                    } else {
                        alert(r.msg);
                    }
                })
        }

        function CarregarListaProduto() {
            let ListaItens = document.getElementById("Itens");
            let BotaoAdd = document.querySelectorAll(".btnAdicionar");


            for (let i = 0; i < BotaoAdd.length; i++) {
                BotaoAdd[i].disabled = false;
                for (let j = 0; j < posicao.length; j++) {
                    if (BotaoAdd[i].dataset.posicao == posicao[j]) {
                        BotaoAdd[i].disabled = true;
                    }
                }

            }



            let html = `                
        <table class="table table-striped table-hover">
            <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Quantidade(Disponivel)</th>
                <th>Quantidade a ser levada</th>
                <th>Remover</th>
            </tr>
            <tbody class="">`;

            for (let i = 0; i < posicao.length; i++) {

                html += `
            <tr data-idprodutoEnviar=${ListaProdutos.item[posicao[i]].produtoId}>
                <td><img src="${ListaProdutos.item[posicao[i]].produtoImagem}" width="80"></td>
                <td>${ListaProdutos.item[posicao[i]].produtoNome}</td>
                <td data-quantidade="${ListaProdutos.item[posicao[i]].produtoQuantidade}">${ListaProdutos.item[posicao[i]].produtoQuantidade}</td>
                <td><input class="form-control quantidade" type="number" placeholder="Coloque a quantidade" value="1"></td>
                <td><button data-codigoremover="${ListaProdutos.item[posicao[i]].produtoId}" data-codigoposicao="${posicao[i]}" class="btn btn-danger btnExcluir"><i class="fas fa-trash"></i></td>
            </tr>       
            `
            }
            html += `
                </tbody>
            </table>
            <button id="btnEnviar" class="btn btn-outline-primary">Enviar Produtos</button>
        `

            ListaItens.innerHTML = html;
            let btnExcluir = document.querySelectorAll(".btnExcluir");
            for (let i = 0; i < btnExcluir.length; i++) {
                btnExcluir[i].addEventListener("click", ExcluirProduto)
            }

            let btnEnviar = document.getElementById("btnEnviar");
            btnEnviar.addEventListener("click", EnviarProduto);

            let inputQuantidade = document.querySelectorAll(".quantidade");
            for (let i = 0; i < inputQuantidade.length; i++) {
                inputQuantidade[i].addEventListener("input", VerificaValor);
            }

        }

        function VerificaValor() {
            let ValorAtual = this.value;
            let ValorMaximo = this.parentElement.previousElementSibling.dataset.quantidade;

            if (parseInt(ValorAtual) > parseInt(ValorMaximo)) {
                this.value = ValorMaximo;
            } else if (parseInt(ValorAtual) <= 0) {
                this.value = 1
            } else {
                this.value = ValorAtual;
            }
        }

        function ExcluirProduto() {
            console.log(this.dataset.codigoposicao)
            let posicaoRemover = posicao.indexOf(this.dataset.codigoposicao);
            if (posicaoRemover > -1) {
                posicao.splice(posicaoRemover, 1);
            }
            CarregarListaProduto();
        }

        function EnviarProduto() {
            let idProduto = document.querySelectorAll('[data-idprodutoEnviar]');
            let quantidade = document.querySelectorAll(".quantidade");
            let listaEnvio = [];
            let listaQuantidade = [];
            for (let i = 0; i < idProduto.length; i++) {
                listaEnvio.push(idProduto[i].dataset.idprodutoenviar);
                listaQuantidade.push(quantidade[i].value);
            }

            let obj = {
                id: EventoId.value,
                idProduto: listaEnvio,
                quantidadeProduto: listaQuantidade
            }
            fetch('/admin/eventos/saidaEvento/produto', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        alert(r.msg);
                        PatrimonioView();
                    } else {
                        alert(r.msg);
                    }
                })



        }

        function AdicionarItemProduto() {
            let id = this.dataset.id;
            this.disabled = true
            let busca = true;
            for (let i = 0; i < posicao.length; i++) {
                if (posicao[i] == this.dataset.posicao) {
                    busca = false
                }
            }
            if (busca == true) {
                posicao.push(this.dataset.posicao);
            }
            CarregarListaProduto();

        }

    }
})