import { Response, Router } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Categoria } from '../models/categoria.model';

const categoriaRoutes = Router();

// Obtener categorias
// categoriaRoutes.get('/', [ verificaToken ], async ( req: any, res: Response) => { //privado
categoriaRoutes.get('/', async ( req: any, res: Response) => { //privado

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 5;

    const categorias = await Categoria.find()
                            .sort({ _id: 1 })
                            .skip( skip )
                            .limit(5)
                            .exec();

    res.json({
        ok: true,
        pagina,
        categorias
    });
});

// Obtener categoria
// categoriaRoutes.get('/:id', [ verificaToken ], async ( req: any, res: Response) => { //privado
categoriaRoutes.get('/:id', async ( req: any, res: Response) => { //publico

    const { id } = req.params;
    const categoria = await Categoria.findById( id )

    res.json( categoria );
});


// Crear Categoria
// categoriaRoutes.post('/create', [ verificaToken ], async (req: any, res: Response) => {
categoriaRoutes.post('/create', async (req: any, res: Response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

});



export default categoriaRoutes;