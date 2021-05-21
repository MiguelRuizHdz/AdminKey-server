"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrearPass {
    constructor() {
        this.randomFunc = {
            lower: this.getRandomLower,
            upper: this.getRandomUpper,
            number: this.getRandomNumber,
            symbol: this.getRandomSymbol
        };
        this.min = 8;
        this.max = 20;
        this.finalPassword = '';
        this.length = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
        this.resultado = this.generarPassword(this.length);
    }
    getRandomLower() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    getRandomUpper() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }
    getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    getRandomSymbol() {
        const symbols = '!@#$%^&*(){}[]=<>/,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
    generarPassword(length) {
        const lower = true;
        const upper = true;
        const number = true;
        const symbol = true;
        var generatedPassword = '';
        const typesCount = 4;
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
        if (typesCount === 0) {
            return '';
        }
        for (let i = 0; i < length; i += typesCount) {
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                generatedPassword += this.randomFunc[funcName]();
            });
        }
        this.finalPassword = generatedPassword.slice(0, length);
        return this.finalPassword;
    }
}
exports.default = CrearPass;
