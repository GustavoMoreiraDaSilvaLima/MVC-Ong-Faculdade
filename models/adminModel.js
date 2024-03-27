const Database = require("../utils/database")

const banco = new Database();

class adminModel {
    #user
    #senha
    constructor(user, senha) {
        this.#user = user;
        this.#senha = senha;
    }

    async buscaUsuario() {
        let sql = 'select * from tabela where usuario = ? and senha = ?'
        let valores = [this.#user, this.#senha];

        let result = await banco.ExecutaComando(sql, valores);

        return result;
    }
}
module.exports = adminModel;