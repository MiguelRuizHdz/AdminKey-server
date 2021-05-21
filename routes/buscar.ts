import { Response, Router } from 'express';
import { Post } from '../models/post.model';

const buscarRoutes = Router();

// buscarRoutes.get('/', [ verificaToken ], async ( descripcion='', res: Response ) => {
    
//     const regex = new RegExp( descripcion, 'i' );
//     const posts = await Post.find({ descripcion: regex});

//     res.json({
//         results: posts
//     });
// });

export default buscarRoutes;