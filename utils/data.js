

class Data {
    #data

    get data() { return this.#data; }
    set data(data) { this.#data = data; }

    constructor(data) {
        this.#data = data
    }

    dataAtual() {
        let DataAtual = new Date();
        let dia = DataAtual.getDate();
        let mes = DataAtual.getMonth() + 1;
        let ano = DataAtual.getFullYear();
        if (dia < 10) {
            dia = "0" + dia;
        }
        if (mes < 10) {
            mes = "0" + mes;
        }

        DataAtual = `${ano}-${mes}-${dia}`;
        return DataAtual;
    }

}

module.exports = Data;