
import { Schema, Document, model } from 'mongoose';

const categoriaSchema = new Schema({

    nombre: {
        type: String 
    }

});

categoriaSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

interface ICategoria extends Document {
    nombre: string;
}

export const Categoria = model<ICategoria>('Categoria', categoriaSchema);
