export default class CrearPass {

    readonly randomFunc: { [key: string]: any } = {
        lower: this.getRandomLower,
        upper: this.getRandomUpper,
        number: this.getRandomNumber,
        symbol: this.getRandomSymbol
    };

    private min= 8;
    private max= 20;
    
    public finalPassword: string = '';
    private length: number = Math.floor(Math.random()*(this.max-this.min+1)+this.min)

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

    public resultado = this.generarPassword(
        this.length
    );

    generarPassword(length:number){
        const lower: boolean = true;
        const upper: boolean = true;
        const number: boolean = true;
        const symbol: boolean = true;
        var generatedPassword = '';
    
        const typesCount: number = 4;
    
        const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
            item => Object.values(item)[0]
        );
    
        if(typesCount === 0){
            return '';
        }
    
        for(let i = 0; i < length; i += typesCount){
            typesArr.forEach(type =>{
                const funcName: string = Object.keys(type)[0];
    
                generatedPassword += this.randomFunc[funcName]();
            });
        }
        this.finalPassword = generatedPassword.slice(0, length);
        return this.finalPassword;
    }

    constructor(){
    }

}
