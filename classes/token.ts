import jwt from 'jsonwebtoken';

export default class Token {

    private static seed: string = 'este-es-mi-personal-seed-de-mi-app-secreto';
    private static caducidad:string = '10m';

    constructor() { }

    static getJwtToken( payload: any ): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken( userToken: string){

        return new Promise( (resolve, reject ) => {
            jwt.verify( userToken, this.seed, (err, decoded) => {
                if ( err ) {
                    reject();
                } else {
                    resolve( decoded );
                }
            })

        })


    }

}