const VoluntarioModel = require(`../models/voluntarioModel`);

let contador_esp_noticias = 0;

class HomeController {
  homeView(req, res) {
    res.render("home");
  }

  QuemSomosView(req, res) {
    res.render("QuemSomos");
  }

  sejaView(req, res) {
    res.render("form");
  }

  async eventoView(req, res) {
    //Visualização de qualquer pessoa, salvo os voluntarios que terão opção extra
  }

  async parceirosView(req, res) {}

  async projetosView(req, res) {
    //Se for voluntario dar opção de participar se não tiver acontecido
  }

  async cadastrarVoluntarios(req, res) {
    var ok = true;
    if (
      req.body.email != "" &&
      req.body.nome != "" &&
      req.body.telefone != "" &&
      req.body.desc != "" &&
      req.body.cpf != "0"
    ) {
      let voluntario = new VoluntarioModel(
        0,
        req.body.email,
        req.body.nome,
        req.body.telefone,
        req.body.desc,
        req.body.cpf
      );

      ok = await voluntario.cadastrar_no_model();
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

}

//permite que a classe homeController seja importado
module.exports = HomeController;
