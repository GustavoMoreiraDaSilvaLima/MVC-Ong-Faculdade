document.addEventListener("DOMContentLoaded", function () {
    let filtro = new Filtros();
    document.getElementById("aplicarFiltros").addEventListener("click", async function () { await filtro.Controle() })


    CarregarBotao();

});

function CarregarBotao() {
    let excluir = new Excluir();
    let BotaoExcluir = document.querySelectorAll(".btnExcluir");

    for (let i = 0; i < BotaoExcluir.length; i++) {
        BotaoExcluir[i].addEventListener("click", excluir.Cancelar);
    }
}





class Excluir {

    Cancelar() {
        let id = this.dataset.codigocancelamente;
        if (confirm("Tem certeza que deseja cancelar este evento? (Está ação é irreversivel!)")) {
            if (id != "") {
                let obj = {
                    id: id,
                };
                fetch("/admin/eventos/excluir", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                })
                    .then((r) => {
                        return r.json();
                    })
                    .then((r) => {
                        if (r.ok) {
                            alert(r.msg);
                            window.location.href = "/admin/eventos"
                        } else {
                            alert(r.msg);
                        }
                    });
            }
        }
    }
}

class Filtros {
    #data
    #Cancelado
    #Proximos
    #Finalizado
    constructor() {
        this.#data = document.getElementById("DataMaior");
        this.#Cancelado = document.getElementById("Cancelados");
        this.#Proximos = document.getElementById("Proximos");
        this.#Finalizado = document.getElementById("Finalizado");
    }

    get data() { return this.#data; }
    get Cancelado() { return this.#Cancelado; }
    get Proximos() { return this.#Proximos; }
    get Finalizado() { return this.#Finalizado; }

    async Controle() {
        let dados = this.VerificarFiltros();
        let DadosBack = await this.EnvioDeDados(dados);
        this.AplicaFiltros(DadosBack);
    }



    VerificarFiltros() {
        let dados = []

        if (this.#data.value) {
            dados.push("DataMaior");
            dados.push(this.#data.value);
        }
        if (this.#Proximos.checked) {
            let dataAtual = new Date();

            let dia = String(dataAtual.getDate()).padStart(2, '0'); // Obtém o dia do mês
            let mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Obtém o mês (Janeiro é 0, por isso soma 1)
            let ano = dataAtual.getFullYear(); // Obtém o ano

            // Formata a data como "dd/mm/yyyy"
            let dataFormatada = `${ano}/${mes}/${dia}`;


            dados.push("Proximos");
            dados.push(dataFormatada);
        }
        if (this.#Cancelado.checked) {
            dados.push("Cancelado");
            dados.push("Cancelado");
        }
        if (this.#Finalizado.checked) {
            dados.push("Finalizado");
            dados.push("Finalizado");
        }
        if (dados.length == 0) {
            dados.push("Todos")
        }
        return dados;

    }



    async EnvioDeDados(dados) {
        let String = this.StringFicar(dados)
        return fetch("/admin/eventos/filtro/" + String)
            .then((r) => {
                return r.json();
            })
            .then((r) => {
                return r;
            });
    }

    TirarBarra(valor) {
        return valor.replace(/\//g, "-");
    }

    StringFicar(valor) {

        let string = '';
        for (let i = 0; i < valor.length; i++) {
            string += `${valor[i]}.`;
        }

        return this.TirarBarra(string);
    }


    AplicaFiltros(Itens) {
        let OndeEnviar = document.getElementById("Eventos");
        let html = '';
        console.log(Itens);

        html += `<div class="row mt-4">`
        if (Itens.lista.length > 0) {
            for (let i = 0; i < Itens.lista.length; i++) {
                html += ` 
                <div class="col-md-4 d-flex align-items-stretch">
                `
                if (Itens.lista[i].evento_status != "FINALIZADO" && Itens.lista[i].evento_status != "CANCELADO") {
                    html += `
                   <div class="card border-primary mb-4">
                        <img src="${Itens.lista[i].evento_imagem}" class="card-img-top" alt="Evento ${i + 1}" height="250px" >
                        <div class="card-body d-flex flex-column">
                    `;
                } else if (Itens.lista[i].evento_status == "CANCELADO") {
                    html += `
                    <div class="card border-danger mb-4">
                        <img src="${Itens.lista[i].evento_imagem}" class="card-img-top" alt="Evento ${i + 1}" height="250px" >
                        <div class="card-body text-danger d-flex flex-column">
                    `;
                } else if (Itens.lista[i].evento_status == "FINALIZADO") {
                    html += `
                    <div class="card border-success mb-4">
                        <img src="${Itens.lista[i].evento_imagem}" class="card-img-top" alt="Evento ${i + 1}" height="250px" >
                        <div class="card-body text-success d-flex flex-column">
                    `;
                }
                html += `
                            <h5 class="card-title">${Itens.lista[i].evento_nome}</h5>
                            <p class="card-text flex-grow-1">${Itens.lista[i].evento_descricao}</p>
                            <p class="card-text text-center">
                                <small class="text-muted">Data: ${new Date(Itens.lista[i].evento_data).toLocaleDateString()}<br> 
                                Inicio: ${Itens.lista[i].evento_inicio}
                                Duração:${Itens.lista[i].evento_duracao} Horas</small>
                            </p>
                            <div class="mt-auto d-flex justify-content-between">
                                ${Itens.lista[i].evento_status == "FINALIZADO" ? `<button class="btnExcluir btn btn-success">Evento Finalizado</button>` : Itens.lista[i].evento_status == "CANCELADO" ? `<button href="#" class="btnExcluir btn btn-danger text-center">Evento Cancelado, Impossivel editar</button>` : `<button data-codigocancelamente="${Itens.lista[i].evento_id}" class=" btnExcluir btn btn-danger">Cancelar Evento</button>`}
                                ${Itens.lista[i].evento_status == "FINALIZADO" ? `<a href="/admin/eventos/alterar/${Itens.lista[i].evento_id}" class="btn btn-primary">Finalizar saida de evento</a>` : Itens.lista[i].evento_status == "CANCELADO" ? `` : `<a href="/admin/eventos/alterar/${Itens.lista[i].evento_id}" class="btn btn-primary">Editar/Registrar saída</a>`}
                            </div>
                        </div>
                    </div>
                </div>
            
                `
            }
        } else {
            html += `<h1><strong>Nenhum Evento encontrado</strong></h1>`;
        }
        html += `</div>`;
        OndeEnviar.innerHTML = html;
        CarregarBotao();
    }


}

