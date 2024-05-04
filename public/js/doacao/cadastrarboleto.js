document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("enviar").addEventListener("click", cadastrar);


    function cadastrar() {
        let status = "Emitido"
            let obj = {
                status: status
            }

            fetch("/send/boleto", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        window.location.href = "/doacao";
                    }
                    else {
                        alert(r.msg);
                    }
                })
        }
    }
)