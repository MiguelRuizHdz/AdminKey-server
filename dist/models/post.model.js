"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    passSecure: {
        type: String
    },
    cuenta: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    },
    imagen: {
        type: String
    },
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'Debe de existir una referencia a una categoría']
    },
    descripcion: {
        type: String
    }
});
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = mongoose_1.model('Post', postSchema);
