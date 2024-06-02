document.addEventListener("DOMContentLoaded", function(){

    var listaBtns = document.querySelectorAll(".btnExcluir");

    for(var i = 0; i<listaBtns.length; i++) {
        listaBtns[i].addEventListener("click", excluirProduto);
    }

    var ExportExcel = document.getElementById('ExportExcel');
    var ExportPdf = document.getElementById('ExportPdf');
    var exportarTabela = document.getElementById("ExportarTabela");

    var filtroEscolhido = 0;

    let itemFiltro = document.querySelectorAll(".itemFiltro")


    document.getElementById("btnFiltrar").addEventListener("click", buscar);
    console.log(123)


    function buscar(){
        let nome = document.getElementById('productName').value;
        let tipoPreco = document.querySelector('input[name="priceOrder"]:checked')?.id || '';
        let categorias = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.id);
        let marcas = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(el => el.id);
        let quantiaMin = document.getElementById('quantityMin').value;
        let quantiaMax = document.getElementById('quantityMax').value;

        console.log("Nome:" + nome + "  ordem :" +  tipoPreco + "  cate :" + categorias + "  marca :" + marcas + "  minima :" + quantiaMin +"  maxima :" + quantiaMax)
    
        let obj = {
            nome: nome,
            tipoPreco: tipoPreco,
            categorias: categorias,
            marcas: marcas.length, 
            quantiaMin: quantiaMin, 
            quantiaMax: quantiaMax 
        }
        console.log(obj.nome)
        console.log(obj.nome)
        console.log(obj.nome)

        fetch(`/admin/produto/filtrar`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(r=> {
            return r.json();
        })
        .then(r=> {

            if(r.length > 0) {
                let htmlCorpo ="";
                for(let i = 0; i<r.length; i++) {
                    htmlCorpo += `
                                <tr>
                                    <td>${r[i].pedidoId}</td>
                                    <td>${new Date(r[i].pedidoData).toLocaleString()}</td>
                                    <td>${r[i].produtoNome}</td>
                                    <td>${r[i].pedidoItemValor}</td>
                                    <td>${r[i].pedidoItemQuantidade}</td>
                                    <td>${r[i].pedidoValorTotal}</td>
                                </tr>
                            `;
                }

                document.querySelector("#tabelaPedidos > tbody").innerHTML = htmlCorpo;
            }
        })
    
    }



    ExportExcel.addEventListener("input",LiberarBotao);
    ExportPdf.addEventListener("input",LiberarBotao);
    exportarTabela.addEventListener("click",ExporTabela)

    function LiberarBotao(){
        if(ExportPdf.checked || ExportExcel.checked ){
            //Alguma habilitada
            exportarTabela.disabled = false; 


        }
        else if(!ExportPdf.checked && !ExportExcel.checked){
            //As duas desabilitadas
            exportarTabela.disabled = true; 
        }
    }  
    async function ExporTabela(){
        let Dados = await BuscarTabela();
        let paginaAtual = document.getElementById('btn_atual').dataset.pagina;
        paginaAtual = parseInt(paginaAtual);

        AtualizaTd(Dados,Dados.status);
        if(ExportExcel.checked){
            exportarExcel();
        }
        if(ExportPdf.checked){
            window.print();
        }

        Dados = await BuscarTabela(paginaAtual);
        AtualizaTd(Dados,Dados.status);



    }

    function AtualizaTd(item, disponibilidade = "disponivel") {

        if (disponibilidade != "erro tabela") {
            let Conteudo = document.querySelector("#conteudo");
            let TabelaNova = "";
            for (let l = 0; l < item.item.length; l++) {
                TabelaNova += `
                <tr id="${item.item[l].id}">
                <td scope="row">`
                for (let i = 0; i < item.pgt.length; i++) {
                    if (item.item[l].tipo == item.pgt[i].id) {

                        TabelaNova += `${item.pgt[i].nome}`
                    }
                }
                TabelaNova += `</td>
                <td>
                    ${item.item[l].nome}
                </td>
                <td>
                    ${item.item[l].valor}
                </td>
                <td>`
                for (let i = 0; i < item.situacao.length; i++) {
                    if (item.item[l].status == item.situacao[i].id) {

                        TabelaNova += `${item.situacao[i].nome}`
                    }
                }

                TabelaNova +=
                    `</td>
                <td>
                    ${new Date(item.item[l].data).toLocaleString()}
                </td>
                <td class="retirar">
                <div class="retirar">
                    <button class="btn btn-primary btnEditar">
                    <i id="1" class="fas fa-pen"></i>
                    </button>
                    <button data-codigoexclusao="${item.item[l].id}" class="btn btn-danger btnExcluir"
                    id=""><i class="fas fa-trash"></i>
                    </button>
                </div>
                </td>
            `
            }
            Conteudo.innerHTML = TabelaNova;
        }

    }

    function exportarExcel() {
        //chama a biblioteca para gerar o excel
        var wb = XLSX.utils.table_to_book(document.getElementById("Tabela"));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "relatorio-doacao.xlsx");
    }

    
    async function BuscarTabela() {

        return fetch("/admin/produto/tabela")
            .then(r => {
                return r.json();
            })
            .then(r => {
                console.log(r)
                return r;
            })
    }


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
})


