"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const encriptacion_1 = __importDefault(require("../classes/encriptacion"));
const postRoutes = express_1.Router();
// Obtener POST paginados
postRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    body.usuario = req.usuario._id;
    if (req.query.categoria.length > 1) {
        body.categoria = req.query.categoria;
    }
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    let posts = yield post_model_1.Post.find(body)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(10)
        .populate('usuario', '-password')
        .populate('categoria')
        .exec();
    let data = {
        ok: true,
        pagina,
        body,
        posts
    };
    res.json(data);
}));
// Crear POST
postRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    console.log(body.passSecure);
    console.log(body.usuario);
    body.passSecure = encriptacion_1.default.encrypt(body.passSecure);
    console.log(body.passSecure);
    post_model_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password').populate('categoria').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
// Modificar post
postRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const post = {
        passSecure: req.body.passSecure,
        cuenta: req.body.cuenta,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
    };
    post_model_1.Post.findByIdAndUpdate(req._id, post, { new: true }, (err, postDB) => {
        if (err)
            throw err;
        if (!postDB) {
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
postRoutes.delete('/:id', autenticacion_1.verificaToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const postBorrado = yield post_model_1.Post.deleteOne({ _id: { $eq: id } });
    res.json({
        ok: true,
        postBorrado
    });
}));
exports.default = postRoutes;
