const UsuarioModel = require("../models/usuarioModel");

class loginController {
  loginView(req, res) {
    res.render("login", { layout: "login" });
  }

  async login(req, res) {
    let ok = false
    let msg = "";
    if (req.body.email != null && req.body.password != null) {
      let usuario = new UsuarioModel();
      usuario = await usuario.obterPorEmailSenha(
        req.body.email,
        req.body.password
      );
      if (usuario != null) {
        res.cookie("usuarioLogado", usuario.usuario_id);
        ok = true
      } else {
        msg = "Usuário/Senha incorretos!";
      }
    } else {
      msg = "Usuário/Senha incorretos!";
    }
    res.send({msg : msg, ok : ok})
  }
}

module.exports = loginController;
