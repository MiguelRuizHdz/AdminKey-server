import { Response, Router } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import Encriptacion from '../classes/encriptacion';

const postRoutes = Router();

// Obtener POST paginados
postRoutes.get('/', [ verificaToken ], async ( req: any, res: Response) => { //privado

    const body = req.body;
    body.usuario = req.usuario._id;
    if(req.query.categoria.length > 1){
        body.categoria = req.query.categoria;
    }
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    let posts = await Post.find( body )
                            .sort({ _id: -1})
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .populate('categoria')
                            .exec();

    let data:any={
        ok: true,
        pagina,
        body,
        posts
    };

    res.json(
        data
    );
    

});


// Crear POST
postRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {
    
    const body = req.body;
    body.usuario = req.usuario._id;
    console.log(body.passSecure);
    console.log(body.usuario);
    body.passSecure = Encriptacion.encrypt(body.passSecure);
    console.log(body.passSecure);

    Post.create( body ).then( async postDB => {

        await postDB.populate('usuario', '-password').populate('categoria').execPopulate();

        res.json({
            ok: true,
            post: postDB
        });

    }).catch( err => {
        res.json(err)
    });


});


// Modificar post
postRoutes.post('/update', verificaToken, ( req: any, res: Response) => {

    const post = {
        passSecure: req.body.passSecure,
        cuenta: req.body.cuenta,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
    }

    Post.findByIdAndUpdate( req._id, post, { new: true }, (err, postDB) => {
        
        if ( err ) throw err;

        if ( !postDB ){
            return res.json({
                ok: false,
                mensaje: 'No existe un post con ese ID'
            });
        }

        res.json({
            ok: true,
            post
        });

    });

});

// Eliminar post
postRoutes.delete('/:id', verificaToken, async ( req: any, res: Response) => {
    const { id } = req.params;
    const postBorrado = await Post.deleteOne( { _id: { $eq: id} } );
    res.json({
        ok: true,
        postBorrado
    });
});

export default postRoutes;