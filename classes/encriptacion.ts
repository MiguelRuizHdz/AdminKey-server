import * as CryptoJS from 'crypto-js';


export default class Encriptacion {

    private static secretKey: string = "thisismyuniqueseedy18hy6";
    private static encryptedData: string = ""
    private static decryptedData: string = ""

    constructor() { }

    static encrypt(data:any):string {
        return this.encryptedData = CryptoJS.AES.encrypt( data,  this.secretKey ).toString();
    }

    static decrypt( data:any ):string {
        let bytes = CryptoJS.AES.decrypt( data, this.secretKey);
        this.decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        console.log(this.decryptedData);
        return this.decryptedData;
    }

}
