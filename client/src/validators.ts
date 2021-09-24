// Adaptado de https://irias.com.br/blog/como-validar-cpf-cnpj-em-node-js/
export const validateCPF = (cpf: string) => {
    const cpfChars = cpf.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpfChars.length > i; i++) {
        if (cpfChars[i - 1] != cpfChars[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        return false;
    }

    for (var i = 0, p = 10; (cpfChars.length - 2) > i; i++, p--) {
        v1 += (+cpfChars[i]) * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
        v1 = 0;
    }

    if (v1 != (+cpfChars[9])) {
        return false;
    }

    for (var i = 0, p = 11; (cpfChars.length - 1) > i; i++, p--) {
        v2 += (+cpfChars[i]) * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
        v2 = 0;
    }

    return v2 === (+cpfChars[10]);
}