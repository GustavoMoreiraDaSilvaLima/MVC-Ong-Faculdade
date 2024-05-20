const LoginModel = require("../models/loginModel");

class loginController{
    loginView(req,res){

    }


    async login(req,res){
        let msg = "";
        if(req.body.email != null && req.body.password != null) {
            let login = new LoginModel();
            login = await login.obterPorEmailSenha(req.body.email, req.body.password);
            if(login != null) {
                res.cookie("usuarioLogado", login.login_id);
                res.redirect("/admin");
            }
            else {
                msg = "Usuário/Senha incorretos!";
            }
        }
        else {
            msg = "Usuário/Senha incorretos!";
        }
    }





}

module.exports = loginController;