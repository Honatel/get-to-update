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
    const qtd = 6195475
    let i = 0
    const limit = 50//qtd / 10000
    let lastId = 0

    while (i < qtd) {
        const aletas = await aletaModel
            .find({ _id: { $gt: lastId } })
            // .find({ _id: 4574809 })
            .limit(limit);

        const promise = aletas.map(async (aleta) => {

            let novoResumo = aleta.resumo1!
                .replace(/&NBSP;/g, '&nbsp;')
                .replace(/<BR>+(?=<BR><BR>)/g, '')
                .replace(/&ATILDE;/g, '&Atilde;')
                .replace(/&APOS;/g, '&apos;')
                .replace(/&AMP;/g, '&amp;')
                .replace(/&LT;/g, '&lt;')
                .replace(/&GT;/g, '&gt;')
                .replace(/&IEXCL;/g, '&iexcl;')
                .replace(/&CENT;/g, '&cent;')
                .replace(/&POUND;/g, '&pound;')
                .replace(/&CURREN;/g, '&curren;')
                .replace(/&YEN;/g, '&yen;')
                .replace(/&BRVBAR;/g, '&brvbar;')
                .replace(/&SECT;/g, '&sect;')
                .replace(/&UML;/g, '&uml;')
                .replace(/&COPY;/g, '&copy;')
                .replace(/&ORDF;/g, '&ordf;')
                .replace(/&LAQUO;/g, '&laquo;')
                .replace(/&NOT;/g, '&not;')
                .replace(/&SHY;/g, '&shy;')
                .replace(/&REG;/g, '&reg;')
                .replace(/&MACR;/g, '&macr;')
                .replace(/&DEG;/g, '&deg;')
                .replace(/&PLUSMN;/g, '&plusmn;')
                .replace(/&SUP2;/g, '&sup2;')
                .replace(/&SUP3;/g, '&sup3;')
                .replace(/&ACUTE;/g, '&acute;')
                .replace(/&MICRO;/g, '&micro;')
                .replace(/&PARA;/g, '&para;')
                .replace(/&MIDDOT;/g, '&middot;')
                .replace(/&CEDIL;/g, '&cedil;')
                .replace(/&SUP1;/g, '&sup1;')
                .replace(/&ORDM;/g, '&ordm;')
                .replace(/&RAQUO;/g, '&raquo;')
                .replace(/&FRAC14;/g, '&frac14;')
                .replace(/&FRAC12;/g, '&frac12;')
                .replace(/&FRAC34;/g, '&frac34;')
                .replace(/&IQUEST;/g, '&iquest;')
                .replace(/&TIMES;/g, '&times;')
                .replace(/&DIVIDE;/g, '&divide;')
                .replace(/&AGRAVE;/g, '&Agrave;')
                .replace(/&AACUTE;/g, '&Aacute;')
                .replace(/&ACIRC;/g, '&Acirc;')
                .replace(/&AUML;/g, '&Auml;')
                .replace(/&ARING;/g, '&Aring;')
                .replace(/&AELIG;/g, '&AElig;')
                .replace(/&CCEDIL;/g, '&Ccedil;')
                .replace(/&EGRAVE;/g, '&Egrave;')
                .replace(/&EACUTE;/g, '&Eacute;')
                .replace(/&ECIRC;/g, '&Ecirc;')
                .replace(/&EUML;/g, '&Euml;')
                .replace(/&IGRAVE;/g, '&Igrave;')
                .replace(/&IACUTE;/g, '&Iacute;')
                .replace(/&ICIRC;/g, '&Icirc;')
                .replace(/&IUML;/g, '&Iuml;')
                .replace(/&ETH;/g, '&ETH;')
                .replace(/&NTILDE;/g, '&Ntilde;')
                .replace(/&OGRAVE;/g, '&Ograve;')
                .replace(/&OACUTE;/g, '&Oacute;')
                .replace(/&OCIRC;/g, '&Ocirc;')
                .replace(/&OTILDE;/g, '&Otilde;')
                .replace(/&OUML;/g, '&Ouml;')
                .replace(/&OSLASH;/g, '&Oslash;')
                .replace(/&UGRAVE;/g, '&Ugrave;')
                .replace(/&UACUTE;/g, '&Uacute;')
                .replace(/&UCIRC;/g, '&Ucirc;')
                .replace(/&UUML;/g, '&Uuml;')
                .replace(/&YACUTE;/g, '&Yacute;')
                .replace(/&THORN;/g, '&THORN;')
                .replace(/&SZLIG;/g, '&szlig;')
                .replace(/&AGRAVE;/g, '&agrave;')
                .replace(/&AACUTE;/g, '&aacute;')
                .replace(/&ACIRC;/g, '&acirc;')
                .replace(/&ATILDE;/g, '&atilde;')
                .replace(/&AUML;/g, '&auml;')
                .replace(/&ARING;/g, '&aring;')
                .replace(/&AELIG;/g, '&aelig;')
                .replace(/&CCEDIL;/g, '&ccedil;')
                .replace(/&EGRAVE;/g, '&egrave;')
                .replace(/&EACUTE;/g, '&eacute;')
                .replace(/&ECIRC;/g, '&ecirc;')
                .replace(/&EUML;/g, '&euml;')
                .replace(/&IGRAVE;/g, '&igrave;')
                .replace(/&IACUTE;/g, '&iacute;')
                .replace(/&ICIRC;/g, '&icirc;')
                .replace(/&IUML;/g, '&iuml;')
                .replace(/&ETH;/g, '&eth;')
                .replace(/&NTILDE;/g, '&ntilde;')
                .replace(/&OGRAVE;/g, '&ograve;')
                .replace(/&OACUTE;/g, '&oacute;')
                .replace(/&OCIRC;/g, '&ocirc;')
                .replace(/&OTILDE;/g, '&otilde;')
                .replace(/&OUML;/g, '&ouml;')
                .replace(/&OSLASH;/g, '&oslash;')
                .replace(/&UGRAVE;/g, '&ugrave;')
                .replace(/&UACUTE;/g, '&uacute;')
                .replace(/&UCIRC;/g, '&ucirc;')
                .replace(/&UUML;/g, '&uuml;')
                .replace(/&YACUTE;/g, '&yacute;')
                .replace(/&THORN;/g, '&thorn;')
                .replace(/&YUML;/g, '&yuml;')

                .replace(/&LARR;/g, '&larr;')
                .replace(/&UARR;/g, '&uarr;')
                .replace(/&RARR;/g, '&rarr;')
                .replace(/&DARR;/g, '&darr;')
                .replace(/&HARR;/g, '&harr;')
                .replace(/&CRARR;/g, '&crarr;')
                .replace(/&LARR;/g, '&lArr;')
                .replace(/&UARR;/g, '&uArr;')
                .replace(/&RARR;/g, '&rArr;')
                .replace(/&DARR;/g, '&dArr;')
                .replace(/&HARR;/g, '&hArr;')

            await aletaModel.updateOne({ _id: aleta._id }, { resumo1: novoResumo, resumo2: aleta.resumo2, resumo3: aleta.resumo3, resumo4: aleta.resumo4 });
            lastId = aleta._id
            i += 1
        })

        await bluebird.all(promise);

        console.log(`${i} % ATUALIZADO COM SUCESSO`)
    }
})

const createNewRegisters = (() => {
    const aletaModel = mongoose.model('aleta_textos', schema);

    const arr = [{ _id: 114, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' },
    { _id: 115, resumo1: 'sfjaklçkszjgzxlçjxzoljxaklbvsablxkzg,sdz</p><BR><BR><BR><BR><p>' }]

    aletaModel.insertMany(arr);
})

mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Succesfully Connected to Mongo! - Version 1.3')
        console.log('🚀 APLICATIVO INICIADO...')
        await app()
        console.log('OBJETOS ATUALIZADOS COM SUCESSO')

    })
    .catch(err => console.log(`Error Connection Mongo:${err}`));
