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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_model_1 = require("../models/categoria.model");
const categoriaRoutes = express_1.Router();
// Obtener categorias
// categoriaRoutes.get('/', [ verificaToken ], async ( req: any, res: Response) => { //privado
categoriaRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 5;
    const categorias = yield categoria_model_1.Categoria.find()
        .sort({ _id: 1 })
        .skip(skip)
        .limit(5)
        .exec();
    res.json({
        ok: true,
        pagina,
        categorias
    });
}));
// Obtener categoria
// categoriaRoutes.get('/:id', [ verificaToken ], async ( req: any, res: Response) => { //privado
categoriaRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_model_1.Categoria.findById(id);
    res.json(categoria);
}));
// Crear Categoria
// categoriaRoutes.post('/create', [ verificaToken ], async (req: any, res: Response) => {
categoriaRoutes.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = yield categoria_model_1.Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre
    };
    const categoria = new categoria_model_1.Categoria(data);
    // Guardar DB
    yield categoria.save();
    res.status(201).json(categoria);
}));
exports.default = categoriaRoutes;
