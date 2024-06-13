document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnLogin").addEventListener("click", logar);
  
    function limparValidacao() {
      document.getElementById("typeEmailX").style["border-color"] = "#ced4da";
      document.getElementById("typePasswordX").style["border-color"] = "#ced4da";
    }
  
    function logar() {
        debugger
      limparValidacao();
      let typeEmailX = document.querySelector("#typeEmailX").value;
      let typePasswordX = document.querySelector("#typePasswordX").value;
  
      let listaErros = [];
      if (typeEmailX == "") {
        listaErros.push("typeEmailX");
      }
      if (typePasswordX == "") {
        listaErros.push("typePasswordX");
      }
  
      if (listaErros.length == 0) {
        //enviar ao backend com fetch
  
        let obj = {
          email: typeEmailX,
          password: typePasswordX
        };
  
        fetch("/login/validar", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((r) => {
        return r.json();
        })
        .then((r) => {
        if (r.ok) {
            window.location.href = "/admin";
        } else {
            alert(r.msg);
        }
        });
      } else {
        //avisar sobre o preenchimento incorreto
        for (let i = 0; i < listaErros.length; i++) {
          let campos = document.getElementById(listaErros[i]);
          campos.style["border-color"] = "red";
        }
        alert("Preencha corretamente os campos!");
      }
    }
  });
  