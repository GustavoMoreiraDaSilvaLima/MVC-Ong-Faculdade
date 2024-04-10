

class LoginController {

    loginView(req, res) {
        res.render('login/index', { layout: 'login/index' });
    }

    login(req, res) {
        let msg = "";
        if(req.body.email == "fulvio@unoeste.br" && req.body.password == "123abc") {
            res.redirect('/');
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }

        res.render('login/index', { msg: msg, layout: 'login/index' });
    }
}

module.exports = LoginController;