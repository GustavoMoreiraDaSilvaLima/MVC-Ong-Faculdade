

class Data {
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

    formatarData(data) {
        let dataObj = new Date(data);
        const dataFormatada = dataObj.toISOString().split('T')[0];
    
        return dataFormatada
    }

}

module.exports = Data;