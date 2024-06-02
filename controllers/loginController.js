const UsuarioModel = require("../models/usuarioModel");

class loginController {
    loginView(req, res) {
        res.render('login',{ layout: 'login' });
    }


    async login(req, res) {
        console.log("to aqui")
        let msg = "";
        if (req.body.email != null && req.body.password != null) {
            let usuario = new UsuarioModel();
            usuario = await usuario.obterPorEmailSenha(req.body.email, req.body.password);
            if (usuario != null) {
                res.cookie("usuarioLogado", usuario.usuario_id);
                res.redirect("/admin");
            }
            else {
                msg = "Usuário/Senha incorretos!";
        res.render('login',{ layout: 'login', msg: msg})
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        res.render('login',{ layout: 'login', msg: msg})
        }
    }





}

module.exports = loginController;