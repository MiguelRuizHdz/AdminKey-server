import { Response, Router } from "express";
import CrearPass from '../classes/crearPass';

const passRoutes = Router();

passRoutes.get('/ps', async ( req: any, res: Response) => {

    const imprimir = await new CrearPass();
    
        res.json({
            ok: true,
            pass: imprimir.finalPassword
        });
});
export default passRoutes;