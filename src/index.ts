import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = (async () => {
    var schema = new mongoose.Schema({ _id: 'Number', resumo1: 'string', resumo2: 'string', resumo3: 'string', resumo4: 'string' });
    const aletaModel = mongoose.model('aleta_textos', schema);
    
    // const arr = [{ _id: 114, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' },
    // { _id: 115, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' }]
    
    // aletaModel.insertMany(arr);

    await aletaModel.find({}, (err, aletas) => {
        aletas.map(async (aleta) => {
            aleta.resumo1 = aleta.resumo1.replace("</p><BR><BR><BR><BR><p>", "</p><p>");
            const al = new aletaModel({_id: aleta._id, resumo1:  `${aleta.resumo1}`})
            await al.update(aleta);
        });
    });
})

mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Succesfully Connected to Mongo! - Version 1.3'))
    .catch(err => console.log(`Error Connection Mongo:${err}`));

app()
