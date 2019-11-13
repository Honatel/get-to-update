import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as bluebird from "bluebird";
import * as rp from "request-promise";

//12085681
dotenv.config();

var schema = new mongoose.Schema({ _id: 'Number', resumo1: 'string', resumo2: 'string', resumo3: 'string', resumo4: 'string' });
const aletaModel = mongoose.model('aleta_textos', schema);

const app = (async () => {
    //const qtd = await aletaModel.count(process.env.FILTRO_TESTE ? { _id: process.env.FILTRO_TESTE } : {remumo1: });
    const qtd = 6094566
    let i = 0
    const limit = 50//qtd / 10000
    let lastId = 0
    // const promises: rp.RequestPromise[] = [];
    while (i < 1) {
        console.log(`INICIANDO O PROCESSO DE ATUALIZAÇÃO`)

        const aletas = await aletaModel
            .find({ _id: 4574809 })
            .limit(limit);
            // .find({ _id: { $gt: lastId } })

        const promise = aletas.map(async (aleta) => {
            const novoResumo = await aleta.resumo1!
                    .replace(/<BR>+(?=<BR><BR>)/g, '')
                    .replace('&APOS;', '&apos;')
                    .replace('&AMP;', '&amp;')
                    .replace('&LT;', '&lt;')
                    .replace('&GT;', '&gt;')
                    .replace('&NBSP;', '&nbsp;')
                    .replace('&IEXCL;', '&iexcl;')
                    .replace('&CENT;', '&cent;')
                    .replace('&POUND;', '&pound;')
                    .replace('&CURREN;', '&curren;')
                    .replace('&YEN;', '&yen;')
                    .replace('&BRVBAR;', '&brvbar;')
                    .replace('&SECT;', '&sect;')
                    .replace('&UML;', '&uml;')
                    .replace('&COPY;', '&copy;')
                    .replace('&ORDF;', '&ordf;')
                    .replace('&LAQUO;', '&laquo;')
                    .replace('&NOT;', '&not;')
                    .replace('&SHY;', '&shy;')
                    .replace('&REG;', '&reg;')
                    .replace('&MACR;', '&macr;')
                    .replace('&DEG;', '&deg;')
                    .replace('&PLUSMN;', '&plusmn;')
                    .replace('&SUP2;', '&sup2;')
                    .replace('&SUP3;', '&sup3;')
                    .replace('&ACUTE;', '&acute;')
                    .replace('&MICRO;', '&micro;')
                    .replace('&PARA;', '&para;')
                    .replace('&MIDDOT;', '&middot;')
                    .replace('&CEDIL;', '&cedil;')
                    .replace('&SUP1;', '&sup1;')
                    .replace('&ORDM;', '&ordm;')
                    .replace('&RAQUO;', '&raquo;')
                    .replace('&FRAC14;', '&frac14;')
                    .replace('&FRAC12;', '&frac12;')
                    .replace('&FRAC34;', '&frac34;')
                    .replace('&IQUEST;', '&iquest;')
                    .replace('&TIMES;', '&times;')
                    .replace('&DIVIDE;', '&divide;')
                    .replace('&AGRAVE;', '&Agrave;')
                    .replace('&AACUTE;', '&Aacute;')
                    .replace('&ACIRC;', '&Acirc;')
                    .replace('&ATILDE;', '&Atilde;')
                    .replace('&AUML;', '&Auml;')
                    .replace('&ARING;', '&Aring;')
                    .replace('&AELIG;', '&AElig;')
                    .replace('&CCEDIL;', '&Ccedil;')
                    .replace('&EGRAVE;', '&Egrave;')
                    .replace('&EACUTE;', '&Eacute;')
                    .replace('&ECIRC;', '&Ecirc;')
                    .replace('&EUML;', '&Euml;')
                    .replace('&IGRAVE;', '&Igrave;')
                    .replace('&IACUTE;', '&Iacute;')
                    .replace('&ICIRC;', '&Icirc;')
                    .replace('&IUML;', '&Iuml;')
                    .replace('&ETH;', '&ETH;')
                    .replace('&NTILDE;', '&Ntilde;')
                    .replace('&OGRAVE;', '&Ograve;')
                    .replace('&OACUTE;', '&Oacute;')
                    .replace('&OCIRC;', '&Ocirc;')
                    .replace('&OTILDE;', '&Otilde;')
                    .replace('&OUML;', '&Ouml;')
                    .replace('&OSLASH;', '&Oslash;')
                    .replace('&UGRAVE;', '&Ugrave;')
                    .replace('&UACUTE;', '&Uacute;')
                    .replace('&UCIRC;', '&Ucirc;')
                    .replace('&UUML;', '&Uuml;')
                    .replace('&YACUTE;', '&Yacute;')
                    .replace('&THORN;', '&THORN;')
                    .replace('&SZLIG;', '&szlig;')
                    .replace('&AGRAVE;', '&agrave;')
                    .replace('&AACUTE;', '&aacute;')
                    .replace('&ACIRC;', '&acirc;')
                    .replace('&ATILDE;', '&atilde;')
                    .replace('&AUML;', '&auml;')
                    .replace('&ARING;', '&aring;')
                    .replace('&AELIG;', '&aelig;')
                    .replace('&CCEDIL;', '&ccedil;')
                    .replace('&EGRAVE;', '&egrave;')
                    .replace('&EACUTE;', '&eacute;')
                    .replace('&ECIRC;', '&ecirc;')
                    .replace('&EUML;', '&euml;')
                    .replace('&IGRAVE;', '&igrave;')
                    .replace('&IACUTE;', '&iacute;')
                    .replace('&ICIRC;', '&icirc;')
                    .replace('&IUML;', '&iuml;')
                    .replace('&ETH;', '&eth;')
                    .replace('&NTILDE;', '&ntilde;')
                    .replace('&OGRAVE;', '&ograve;')
                    .replace('&OACUTE;', '&oacute;')
                    .replace('&OCIRC;', '&ocirc;')
                    .replace('&OTILDE;', '&otilde;')
                    .replace('&OUML;', '&ouml;')
                    .replace('&OSLASH;', '&oslash;')
                    .replace('&UGRAVE;', '&ugrave;')
                    .replace('&UACUTE;', '&uacute;')
                    .replace('&UCIRC;', '&ucirc;')
                    .replace('&UUML;', '&uuml;')
                    .replace('&YACUTE;', '&yacute;')
                    .replace('&THORN;', '&thorn;')
                    .replace('&YUML;', '&yuml;')

                // > db.getCollection('aleta_textos').find({_id: 23606060})
            // console.log(`ID ATUALIZADO: ${aleta._id}`)
        //    push(rp(aletaModel.update({ _id: aleta._id }, { resumo1: `${novoResumo}` })));
            await aletaModel.update({ _id: aleta._id }, { resumo1: `${novoResumo}` });
            // console.log(`--------id = ${aleta._id }`)
            lastId = aleta._id
            i += 1
        })

        await bluebird.all(promise);

        console.log(`${i} % ATUALIZADO COM SUCESSO`)
    }
      
    // await bluebird.all(promises);
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
        app()
    })
    .catch(err => console.log(`Error Connection Mongo:${err}`));

//app()
// createNewRegisters()
