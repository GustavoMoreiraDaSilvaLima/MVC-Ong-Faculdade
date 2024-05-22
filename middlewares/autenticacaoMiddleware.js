const usuarioModel = require("../models/usuarioModel");
const UsuarioModel = require("../models/usuarioModel");


//Verificação se o usuário é ADM ou voluntário, visitante Cadastrado
class AutenticacaoMiddleware {


    //Irá indicar qual o nivel de permissão do usuário, Voluntário, visitante cadastrado ou Admin
    async NivelPermissaoVisitante(req, res, next) {

    }

    async NivelPermissaoVoluntario(req, res, next) {

    }


    // usuario_status 1 = ativo e usuario_perfil 1 = administrador
    async NivelPermissaoAdm(req, res, next) {
        if (req.cookies != undefined && req.cookies.usuarioLogado != null) {
            let usuarioId = req.cookies.usuarioLogado;
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(usuarioId);
            if (usuario != null && usuario.usuario_status == 1 && usuario.usuario_perfil == 1) {

                res.locals.usuarioLogado = usuario;
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