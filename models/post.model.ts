
import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({

    created: {
        type: Date
    },
    passSecure:{
        type: String
    },
    cuenta: {
        type: String 
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }, 
    imagen: {
        type: String
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [ true, 'Debe de existir una referencia a una categoría' ]
    },
    descripcion: {
        type: String
    }

});

postSchema.pre<IPost>('save', function( next ) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    passSecure: string;
    cuenta: string;
    imagen: string;
    categoria: string;
    descripcion: string;
    usuario: string;
    created: Date;
}

export const Post = model<IPost>('Post', postSchema);
