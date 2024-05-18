document.addEventListener("DOMContentLoaded", function () {

    let btns = document.querySelectorAll('.btnExclusao')

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', deletar)
    }


    function deletar() {

        let cpf = this.dataset.codigo
        let obj = {
            cpf: cpf
        }
        fetch("/voluntarios", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
            .then(r => {
                return r.json();
            })
            .then(r => {
                if (r.ok) {
                    window.location.href = "/voluntarios";
                }
                else {
                    alert(r.msg);
                }
            })
    }
}

)