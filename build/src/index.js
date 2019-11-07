"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
var schema = new mongoose.Schema({ _id: 'Number', resumo1: 'string', resumo2: 'string', resumo3: 'string', resumo4: 'string' });
const aletaModel = mongoose.model('aleta_textos', schema);
const app = (async () => {
    const aletas = await aletaModel.find({});
    aletas.map(async (aleta) => {
        aleta.resumo1 = aleta.resumo1
            .replace("</p><BR><BR><BR><BR><p>", "</p><p>")
            .replace("</p><BR><BR>", "</p>")
            .replace("<BR><BR><BR>", "<BR>");
        await aletaModel.update({ _id: aleta._id }, { resumo1: `${aleta.resumo1}` });
    });
    console.log('OBJETOS ATUALIZADOS COM SUCESSO');
});
const createNewRegisters = (() => {
    const aletaModel = mongoose.model('aleta_textos', schema);
    const arr = [{ _id: 114, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' },
        { _id: 115, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' }];
    aletaModel.insertMany(arr);
});
mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Succesfully Connected to Mongo! - Version 1.3');
    console.log('🚀 APLICATIVO INICIADO...');
})
    .catch(err => console.log(`Error Connection Mongo:${err}`));
app();
// createNewRegisters()
//# sourceMappingURL=index.js.map