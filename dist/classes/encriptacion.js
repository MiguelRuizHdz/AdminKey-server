"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = __importStar(require("crypto-js"));
class Encriptacion {
    constructor() { }
    static encrypt(data) {
        return this.encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
    }
    static decrypt(data) {
        let bytes = CryptoJS.AES.decrypt(data, this.secretKey);
        this.decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        console.log(this.decryptedData);
        return this.decryptedData;
    }
}
exports.default = Encriptacion;
Encriptacion.secretKey = "thisismyuniqueseedy18hy6";
Encriptacion.encryptedData = "";
Encriptacion.decryptedData = "";
