import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

var schema = new mongoose.Schema({ _id: 'Number', resumo1: 'string', resumo2: 'string', resumo3: 'string', resumo4: 'string' });
const aletaModel = mongoose.model('aleta_textos', schema);

const app = (async () => {
    //const qtd = await aletaModel.count(process.env.FILTRO_TESTE ? { _id: process.env.FILTRO_TESTE } : {});
    const qtd = 1090923
    let i = 0
    const limit = 109//qtd / 10000

    while (i < qtd) {
        console.log(`INICIANDO O PROCESSO DE ATUALIZAÇÃO`)

        let lastId = 0
        const aletas = await aletaModel
            .find(process.env.FILTRO_TESTE ? { _id: process.env.FILTRO_TESTE } : { _id: { $gt: lastId } })
            .limit(limit);

        aletas.map(async (aleta) => {
            aleta!.resumo1 = aleta.resumo1!
                .replace(/<\/p+><BR+><BR+><BR+><BR+><p+>/g, '</p><p>')
                .replace(/<\/p+><BR+><BR+>/g, '</p>')
                .replace(/<BR+><BR+><BR+>/g, '<BR>');

            console.log(`ID ATUALIZADO: ${aleta._id}`)
            await aletaModel.update({ _id: aleta._id }, { resumo1: `${aleta.resumo1}` });

            lastId = aleta._id
            i += 1
        })

        console.log(`${i} % ATUALIZADO COM SUCESSO`)
    }

    console.log('OBJETOS ATUALIZADOS COM SUCESSO')
})

const createNewRegisters = (() => {
    const aletaModel = mongoose.model('aleta_textos', schema);

    const arr = [{ _id: 114, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' },
    { _id: 115, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' }]

    aletaModel.insertMany(arr);
})

mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Succesfully Connected to Mongo! - Version 1.3')
        console.log('🚀 APLICATIVO INICIADO...')
    })
    .catch(err => console.log(`Error Connection Mongo:${err}`));

app()
// createNewRegisters()
