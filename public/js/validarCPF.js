document.addEventListener("DOMContentLoaded",function(){

    var CPF = document.getElementById("CPFValidar");

    function Validar_CPF_CNPJ(cpf){

            // Remove caracteres não numéricos
            cpf = cpf.replace(/[^\d]/g, '');
        
            // Verifica se o CPF tem 11 dígitos
            if (cpf.length !== 11) {
                return false;
            }
        
            // Verifica se todos os dígitos são iguais
            if (/^(\d)\1+$/.test(cpf)) {
                return false;
            }
        
            // Calcula o primeiro dígito verificador
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpf.charAt(i)) * (10 - i);
            }
            let primeiroDigitoVerificador = (soma * 10) % 11;
            if (primeiroDigitoVerificador === 10 || primeiroDigitoVerificador === 11) {
                primeiroDigitoVerificador = 0;
            }
            if (primeiroDigitoVerificador !== parseInt(cpf.charAt(9))) {
                return false;
            }
        
            // Calcula o segundo dígito verificador
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(cpf.charAt(i)) * (11 - i);
            }
            let segundoDigitoVerificador = (soma * 10) % 11;
            if (segundoDigitoVerificador === 10 || segundoDigitoVerificador === 11) {
                segundoDigitoVerificador = 0;
            }
            if (segundoDigitoVerificador !== parseInt(cpf.charAt(10))) {
                return false;
            }
        
            return true;       
    }

})