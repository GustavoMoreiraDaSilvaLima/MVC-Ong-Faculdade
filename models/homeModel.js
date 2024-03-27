const Database = require("../utils/database")

const banco = new Database();

class homeModel {
    #user
    #senha

    constructor(user, senha) {
        this.#user = user;
        this.#senha = senha;
    }
    async busca() {
        let sql = 'select * from tabela where usuario = ? and senha = ?';
        let valor = [this.#user, this.#senha];

        let result = await banco.ExecutaComando(sql, valor);
        return result;
    }
}
module.exports = homeModel;