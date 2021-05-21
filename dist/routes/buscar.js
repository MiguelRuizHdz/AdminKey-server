"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscarRoutes = express_1.Router();
// buscarRoutes.get('/', [ verificaToken ], async ( descripcion='', res: Response ) => {
//     const regex = new RegExp( descripcion, 'i' );
//     const posts = await Post.find({ descripcion: regex});
//     res.json({
//         results: posts
//     });
// });
exports.default = buscarRoutes;
