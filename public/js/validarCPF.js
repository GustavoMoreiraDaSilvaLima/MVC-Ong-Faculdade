class Validador {
    #numberLocale


    set numberLocale(cpf_cnpj) { this.#numberLocale = cpf_cnpj; }
    get numberLocale() { return this.#numberLocale; }

    constructor(cpf_cnpj) {
        this.#numberLocale = cpf_cnpj
    }

    Validar_CPF_CNPJ() {

        // Remove caracteres não numéricos
        this.#numberLocale = numberLocale.replace(/[^\d]/g, '');
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(this.#numberLocale)) {
            return false;
        }
        // Verifica se o CPF tem 11 dígitos
        if (this.#numberLocale.length == 11) {
            // Calcula o primeiro dígito verificador
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(this.#numberLocale.charAt(i)) * (10 - i);
            }
            let primeiroDigitoVerificador = (soma * 10) % 11;
            if (primeiroDigitoVerificador === 10 || primeiroDigitoVerificador === 11) {
                primeiroDigitoVerificador = 0;
            }
            if (primeiroDigitoVerificador !== parseInt(this.#numberLocale.charAt(9))) {
                return false;
            }

            // Calcula o segundo dígito verificador
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(this.#numberLocale.charAt(i)) * (11 - i);
            }
            let segundoDigitoVerificador = (soma * 10) % 11;
            if (segundoDigitoVerificador === 10 || segundoDigitoVerificador === 11) {
                segundoDigitoVerificador = 0;
            }
            if (segundoDigitoVerificador !== parseInt(this.#numberLocale.charAt(10))) {
                return false;
            }

            return true;
        }
        else if (this.#numberLocale .lenght == 14) {
            // Calcula o primeiro dígito verificador
            let soma = 0;
            let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 12; i++) {
                soma += parseInt(this.#numberLocale .charAt(i)) * peso[i];
            }
            let primeiroDigitoVerificador = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (primeiroDigitoVerificador !== parseInt(this.#numberLocale .charAt(12))) {
                return false;
            }

            // Calcula o segundo dígito verificador
            soma = 0;
            peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 13; i++) {
                soma += parseInt(this.#numberLocale .charAt(i)) * peso[i];
            }
            let segundoDigitoVerificador = soma % 11 < 2 ? 0 : 11 - (soma % 11);
            if (segundoDigitoVerificador !== parseInt(this.#numberLocale .charAt(13))) {
                return false;
            }

            return true;
        }
    }

}

export { Validador };