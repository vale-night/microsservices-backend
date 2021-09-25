// Adaptado de https://irias.com.br/blog/como-validar-cpf-cnpjChars-em-node-js/
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

/** Adaptado de  https://irias.com.br/blog/como-validar-cpf-cnpj-em-node-js/*/
export const validateCNPJ = (cnpj: string) => {
    const cnpjChars = cnpj.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cnpjChars.length > i; i++) {
        if (cnpjChars[i - 1] != cnpjChars[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        return false;
    }

    for (var i = 0, p1 = 5, p2 = 13; (cnpjChars.length - 2) > i; i++, p1--, p2--) {
        if (p1 >= 2) {
            v1 += (+cnpjChars[i]) * p1;
        } else {
            v1 += (+cnpjChars[i]) * p2;
        }
    }

    v1 = (v1 % 11);

    if (v1 < 2) {
        v1 = 0;
    } else {
        v1 = (11 - v1);
    }

    if (v1 != (+cnpjChars[12])) {
        return false;
    }

    for (var i = 0, p1 = 6, p2 = 14; (cnpjChars.length - 1) > i; i++, p1--, p2--) {
        if (p1 >= 2) {
            v2 += (+cnpjChars[i]) * p1;
        } else {
            v2 += (+cnpjChars[i]) * p2;
        }
    }

    v2 = (v2 % 11);

    if (v2 < 2) {
        v2 = 0;
    } else {
        v2 = (11 - v2);
    }

    return v2 === (+cnpjChars[13]);
}