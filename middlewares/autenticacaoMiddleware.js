const LoginModel = require("../models/loginModel");
const UsuarioModel = require("../models/usuarioModel");


//Verificação se o usuário é ADM ou voluntário, visitante Cadastrado
class AutenticacaoMiddleware {


    //Irá indicar qual o nivel de permissão do usuário, Voluntário, visitante cadastrado ou Admin
    async NivelPermissaoVisitante(req, res, next) {

    }

    async NivelPermissaoVoluntario(req, res, next) {

    }


    // login_status 1 = ativo e login_perfil 1 = administrador
    async NivelPermissaoAdm(req, res, next) {
        if (req.cookies != undefined && req.cookies.usuarioLogado != null) {
            let loginId = req.cookies.usuarioLogado;
            let login = new LoginModel();
            login = await login.obter(loginId);
            if (login != null && login.login_status == 1 && login.login_perfil == 1) {
                let usuario = new UsuarioModel();

                res.locals.usuarioLogado = usuario.acharPeloLogin(loginId);
                next();
            }
            else {
                res.redirect("/login");
            }
        }
        else {
            res.redirect("/login");
        }
    }



}
module.exports = AutenticacaoMiddleware;