document.addEventListener("DOMContentLoaded", function () {
    var btnAddCarrinho = document.querySelectorAll(".btnAddCarrinho");
  
    let carrinho = [];
    
    if (localStorage.getItem("carrinho") != null) {
      carrinho = JSON.parse(localStorage.getItem("carrinho"));
      document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }
  
    for (let i = 0; i < btnAddCarrinho.length; i++) {
      btnAddCarrinho[i].addEventListener("click", adicionarAoCarrinho);
    }
  
    var modalCarrinho = document.getElementById("modalCarrinho");
    modalCarrinho.addEventListener("show.bs.modal", function (event) {
      carregarCarrinho();
    });
  
    function carregarCarrinho() {
      let html = "";
      let soma = 0;
  
      let carrinhoModal = JSON.parse(localStorage.getItem("carrinho"));
  
      if (!carrinhoModal) {
        document.querySelector("#valorTotalCarrinho").innerHTML = `Vazio`;
        document.querySelector("#antecessor").innerHTML = `Carrinho`;
      } else {
        for (let i = 0; i < carrinhoModal.length; i++) {
          let valorTotalItem = carrinho[i].produtoValor * carrinho[i].quantidade;
  
          html += `<tr class="align-middle text-center">
                            <td>${carrinho[i].produtoId}</td>                       
                            <td><img width="100" height="100" src="${carrinho[i].produtoImagem}" /></td>
                            <td>${carrinho[i].produtoNome}</td>
                            <td>R$${carrinho[i].produtoValor}</td>
                            <td style="text-align: center;">
                            <div class="input-group justify-content-between">
                              <div class="input-group-prepend">
                                <button data-produtoid="${carrinho[i].produtoId}" class="btn btn-outline-dark mt-auto menos">-</button>
                              </div>
                              <input data-produtoid="${carrinho[i].produtoId}" type="text" pattern="[0-9]" style="width: 37px; height: 37px; border-radius: 5px" class="numeroInput" value="${carrinho[i].quantidade}">
                              <div class="input-group-append">
                                <button data-produtoid="${carrinho[i].produtoId}" class="btn btn-outline-dark mt-auto mais">+</button>
                              </div>
                            </div>
                          </td>
                          
                            <td>R$${valorTotalItem}</td>
                            <td><i class="btn bi bi-trash BotaoLixoModal" data-produtoid="${carrinho[i].produtoId}"></i></td>
                        </tr>`;
          soma += valorTotalItem;
        }
  
        document.querySelector("#valorTotalCarrinho").innerHTML =
          `R$` + soma.toFixed(2);
        document.querySelector("#tabelaCarrinho > tbody").innerHTML = html;
  
        const menosBotoes = document.querySelectorAll(".menos");
        const maisBotoes = document.querySelectorAll(".mais");
        const numInput = document.querySelectorAll(".numeroInput")
        const BotaoLixo = document.querySelectorAll(".BotaoLixoModal")
  
        for (let i = 0; i < carrinhoModal.length; i++) {
          menosBotoes[i].addEventListener("click", RemoverDoCarrinhoNoCarrinho);
          maisBotoes[i].addEventListener("click", adicionarAoCarrinhoNoCarrinho);
          numInput[i].addEventListener("change", trocarValorCarringoInput);
          BotaoLixo[i].addEventListener("click", removerItemCarrinhoInteiro);
        }
      }
    }
  
    function adicionarItemCarrinho(item) {
      let lista = localStorage.getItem("carrinho");
  
      if (lista != null) {
        carrinho = JSON.parse(lista);
        let achou = false;
        for (let i = 0; i < carrinho.length; i++) {
          if (carrinho[i].produtoId == item.produtoId && carrinho[i].quantidade <= 998) {
            carrinho[i].quantidade++;
            achou = true;
          }
        }
  
        if (achou == false) {
          item.quantidade = 1;
          carrinho.push(item);
        }
  
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      } else {
        item.quantidade = 1;
        carrinho.push(item);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      }
  
      carrinho = JSON.parse(localStorage.getItem("carrinho"));
      document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }
  
    function adicionarUmItemCarrinho(item){
      let lista = localStorage.getItem("carrinho");
  
      carrinho = JSON.parse(lista);
      for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].produtoId == item.produtoId) {
          if(carrinho[i].quantidade <= 998){
            carrinho[i].quantidade++;
          }
        }
      }
  
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
  
  
      carrinho = JSON.parse(localStorage.getItem("carrinho"));
      document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }
  
    function removerItemCarrinho(item){
      let lista = localStorage.getItem("carrinho");
      let identificador_remocao = -1;
  
      console.log(123)
  
  
      carrinho = JSON.parse(lista);
      for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].produtoId == item.produtoId) {
          identificador_remocao = i;
        }
      }
  
      if(identificador_remocao != -1){
        carrinho.splice(identificador_remocao, 1);
  
        let NovoCarrinhoJson = JSON.stringify(carrinho);
  
        localStorage.setItem("carrinho", NovoCarrinhoJson)
      }
  
      carrinho = JSON.parse(localStorage.getItem("carrinho"));
      document.getElementById("contadorCarrinho").innerText = carrinho.length
  
    }
  
    function removerUmItemCarrinho(item) {
      let lista = localStorage.getItem("carrinho");
  
      carrinho = JSON.parse(lista);
      for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].produtoId == item.produtoId) {
          if(carrinho[i].quantidade >= 1){
            carrinho[i].quantidade--;
          }
        }
      }
  
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
  
  
      carrinho = JSON.parse(localStorage.getItem("carrinho"));
      document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }
  
    function trocarItemCarrinho(item, quantidade) {
      let lista = localStorage.getItem("carrinho");
  
      carrinho = JSON.parse(lista);
      for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].produtoId == item.produtoId) {
          carrinho[i].quantidade = quantidade;
        }
      }
  
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
  
  
      carrinho = JSON.parse(localStorage.getItem("carrinho"));
      document.getElementById("contadorCarrinho").innerText = carrinho.length;
    }
  
    function adicionarAoCarrinho() {
      let id = this.dataset.produtoid;
  
      fetch("/produto/obter/" + id)
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          if (r.produtoEncontrado != null) {
            adicionarItemCarrinho(r.produtoEncontrado);
  
            this.innerHTML = "<i class='fas fa-check'></i> Produto adicionado!";
  
            let that = this;
            setTimeout(function () {
              that.innerHTML = `<i class="bi-cart-fill me-1"></i> Adicionar ao carrinho`;
            }, 5000);
          }
        });
    }
  
    async function adicionarAoCarrinhoNoCarrinho() {
      let id = this.dataset.produtoid;
  
      await fetch("/produto/obter/" + id)
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          if (r.produtoEncontrado != null) {
            adicionarUmItemCarrinho(r.produtoEncontrado);
          }
        });
      carregarCarrinho();
    }
  
    async function RemoverDoCarrinhoNoCarrinho() {
      let id = this.dataset.produtoid;
  
  
      await fetch("/produto/obter/" + id)
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          if (r.produtoEncontrado != null) {
            removerUmItemCarrinho(r.produtoEncontrado);
          }
        });
      carregarCarrinho();
    }
  
    async function removerItemCarrinhoInteiro(){
      let id = this.dataset.produtoid;
  
  
      await fetch("/produto/obter/" + id)
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            if (r.produtoEncontrado != null) {
              removerItemCarrinho(r.produtoEncontrado);
            }
          });
          carregarCarrinho()  
    }
  
    async function trocarValorCarringoInput(){
      let id = this.dataset.produtoid;
      let quantidade = this.value
  
      if(quantidade < 0 || quantidade > 999){
        carregarCarrinho()      
      }
      else{
        await fetch("/produto/obter/" + id)
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            if (r.produtoEncontrado != null) {
              trocarItemCarrinho(r.produtoEncontrado, quantidade);
            }
          });
          carregarCarrinho()      
      }
  
  
    }
  });
  