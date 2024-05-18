const UsuarioModel = require("../models/usuarioModel");


//Verificação se o usuário é ADM ou voluntário, visitante Cadastrado
class AutenticacaoMiddleware {


    //Irá indicar qual o nivel de permissão do usuário, Voluntário, visitante cadastrado ou Admin
    async NivelPermissaoVisitante(req, res, next) {

    }
    
    async NivelPermissaoVoluntario(req, res, next) {

    }

    async NivelPermissaoAdm(req, res, next) {

    }



}
module.exports = AutenticacaoMiddleware;