const adminModel = require("../models/adminModel")
class adminController {
    #usuarioAutenticado
    constructor(){
        this.#usuarioAutenticado = false;
    }
    adminView(req, res) {
        if (this.#usuarioAutenticado) {

        }
        else {

        }
    }

    //Irá informar se o usuário está autenticado
    async usuarioAutenticado(user, senha) {
        let admin = await new adminModel(user, senha);
        let validacao = admin.usuarioAutenticado();

        return validacao;
    }
    setasUsuarioAutenticado(user,senha){
        this.#usuarioAutenticado = usuarioAutenticado(user,senha);
    }
}
module.exports = adminController;