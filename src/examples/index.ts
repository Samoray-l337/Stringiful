/* eslint-disable no-console */
import { stringify, createStringifyFunction } from '..';
import { IStringifyOptions } from '../interfaces';

const bigJson = {
    glossary: {
        title: 'example glossary',
        GlossDiv: {
            title: 'S',
            GlossList: {
                GlossEntry: {
                    ID: 'SGML',
                    DateT: new Date(),
                    SortAs: 'SGML',
                    GlossTerm: 'Standard Generalized Markup Language',
                    Acronym: 'SGML',
                    Abbrev: 'ISO 8879:1986',
                    GlossDef: {
                        para: 'A meta-markup language, used to create markup languages such as DocBook.',
                        GlossSeeAlso: ['GML', 'XML'],
                    },
                    GlossSee: 'markup',
                },
            },
        },
    },
};

const main = async () => {
    const a1 = { a: { b: { c: [{ g: 'abasdasdasdasdasdasdasdac', gds: new Date() }, 2, 3] } } };

    const compactStringify = createStringifyFunction({ inspectOptions: { compact: true } });
    const colorfulEndlessStringify = createStringifyFunction({ inspectOptions: { colors: true, depth: null } });

    const a = compactStringify({ a: 1 });
    console.log(a);

    const b = colorfulEndlessStringify(a1);
    console.log(b);

    const c = stringify(bigJson);
    console.log(c);

    // TODO: block the user can add 2 object of matches:string (add validaiton)
    const stringifyConfig: IStringifyOptions = {
        formatters: [
            { matches: 'string', params: { maxLength: 1 } }, // TODO: dont allow here fieldsWhitelist and blacklist
            { matches: 'axiosError', fieldsBlacklist: [''] },
            {
                matches: (obj: any) => obj.c && obj.c[1] === 2,
                format: (_obj: any) => {
                    return { c: [1, 2, 3] };
                },
            },
        ],
    };

    const d = stringify(bigJson, stringifyConfig);
    console.log(d);

    const e = stringify(a1, stringifyConfig);
    console.log(e);
};

main().catch((err) => {
    console.log(err);
});
