document.addEventListener("DOMContentLoaded", function () {
    let btnRetorno = document.querySelector("#Retornar");

    btnRetorno.addEventListener("mouseenter", function () {
        this.innerHTML = 'Clique para retornar<img src="/img/admin/logo_ong.png" width="20" height="20">'
    })
    btnRetorno.addEventListener("mouseleave", function () {
        this.innerHTML = 'Pagina Inicial<img src="/img/admin/logo_ong.png" width="20" height="20">'
    })

    
})