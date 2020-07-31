import moment from 'moment'
export class Decoder {

    decodeTitulo(linhaDigitavel: string) {
        if (!this.isValid(linhaDigitavel)) {
            return { message: "Linha não é válida" }
        }
        return {
            valido: "O boleto é válido",
            expira: this.getExpireDate(linhaDigitavel),
            codigo: this.generateBarCode(linhaDigitavel),
            valor: this.getPrice(linhaDigitavel)
        }
    }

    isValid(linhaDigitavel: string): boolean {
        if (linhaDigitavel.length < 47)
            return false;
        if (this.isDvValid(linhaDigitavel.slice(0, 10), 9, 2) != Number.parseInt(linhaDigitavel.charAt(9)))
            return false;
        if (this.isDvValid(linhaDigitavel.slice(10, 21), 10, 1) != Number.parseInt(linhaDigitavel.charAt(20)))
            return false;
        if (this.isDvValid(linhaDigitavel.slice(21, 32), 10, 1) != Number.parseInt(linhaDigitavel.charAt(31)))
            return false;
        if (this.isDvCodeValid(this.generateBarCode(linhaDigitavel)) != Number.parseInt(linhaDigitavel.charAt(32)))
            return false;
        return true;
    }

    isDvValid(campo: string, tamanho: number, multiplicador: number): number {
        let dv = 0;
        for (let n = 0; n < tamanho; n++) {
            let multiplicacao = Number.parseInt(campo.charAt(n)) * multiplicador;
            if (multiplicacao >= 10)
                dv = dv + multiplicacao - 10 + 1;
            else
                dv = dv + multiplicacao;
            multiplicador == 1 ? multiplicador = 2 : multiplicador = 1;
        }
        return ((10 - dv % 10) + dv) - dv;
    }

    generateBarCode(linhaDigitavel: string) {
        let barCode = '';
        barCode = linhaDigitavel.slice(0, 4) + this.isDvCodeValid(linhaDigitavel).toString() + linhaDigitavel.slice(33, 47) + linhaDigitavel.slice(4, 9) + linhaDigitavel.slice(10, 20) + linhaDigitavel.slice(21, 31);
        return barCode;
    }

    isDvCodeValid(linhaDigitavel: string): number {
        var multiplier = 2;
        var dv = 0;
        for (let n = 43; n > 0; n--) {
            let result = 0;
            if (n != 4) {
                result = (Number.parseInt(linhaDigitavel.charAt(n))) * multiplier;
                multiplier < 9 ? multiplier++ : multiplier = 2;
                dv += result;
            }
        }
        console.log(dv)
        if (dv == 11 || dv == 10 || dv == 0)
            dv = 1;
        console.log(dv % 11 )
        return Math.abs(dv % 11 - 11);
    }

    getExpireDate(linhaDigitavel: string) {
        return moment('07/10/1997', 'DD/MM/YYYY').add('days', linhaDigitavel.slice(33, 37)).format('DD/MM/YYYY');
    }

    getPrice(linhaDigitavel: string) {
        let price = Number.parseFloat(linhaDigitavel.slice(37, 47));
        return (price / 100).toFixed(2);
    }
}