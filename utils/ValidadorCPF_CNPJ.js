

class Validador {
    #cpf_cnpj

    get cpf_cnpj() { return this.cpf_cnpj; }
    set cpf_cnpj(num) { this.#cpf_cnpj = num; }

    constructor(num) {
        this.#cpf_cnpj = num.replace(/[^\d]/g, '');
    }

    Validar() {
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(this.#cpf_cnpj)) {

            return false;

        } else if (this.#cpf_cnpj.lenght == 11) {
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(this.#cpf_cnpj.charAt(i)) * (10 - i);
            }
            // Calcula o primeiro dígito verificador
            let primeiroDigitoVerificador = (soma * 10) % 11;
            if (primeiroDigitoVerificador === 10 || primeiroDigitoVerificador === 11) {
                primeiroDigitoVerificador = 0;
            }

            if (primeiroDigitoVerificador !== parseInt(this.#cpf_cnpj.charAt(9))) {
                return false;
            }

            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(this.#cpf_cnpj.charAt(i)) * (11 - i);
            }
            // Calcula o segundo dígito verificador
            let segundoDigitoVerificador = (soma * 10) % 11;
            if (segundoDigitoVerificador === 10 || segundoDigitoVerificador === 11) {
                segundoDigitoVerificador = 0;
            }

            if (segundoDigitoVerificador !== parseInt(this.#cpf_cnpj.charAt(10))) {
                return false;
            }

            return true;

        }
        else if (this.#cpf_cnpj.lenght == 14) {
            // Calcula o primeiro dígito verificador
            let soma = 0;
            let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 12; i++) {
                soma += parseInt(cnpj.charAt(i)) * peso[i];
            }
            let primeiroDigitoVerificador = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (primeiroDigitoVerificador !== parseInt(this.#cpf_cnpj.charAt(12))) {
                return false;
            }

            // Calcula o segundo dígito verificador
            soma = 0;
            peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 13; i++) {
                soma += parseInt(this.#cpf_cnpj.charAt(i)) * peso[i];
            }
            let segundoDigitoVerificador = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (segundoDigitoVerificador !== parseInt(this.#cpf_cnpj.charAt(13))) {
                return false;
            }

            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = Validador