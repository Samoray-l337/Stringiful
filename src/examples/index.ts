/* eslint-disable no-console */
// TODO: think about exports isObject , isString etc.
import { stringify, createStringifyFunction, IStringifyOptions } from '..';

const bigJson = {
    glossary: {
        title: 'example glossary',
        GlossDiv: {
            title: 'S',
            GlossList: {
                GlossEntry: {
                    ID: 'SGML',
                    NAME: 'SAMO',
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

    // TODO: make sure to run the format of all the got matches, like one in string formatter and the other one is formatter that matches string with prefix A (think about it)
    // TODO: need to make sure that the known formatters with (matches: string) will allways be after the new formatters that the user created (write about it in the documentation)
    const stringifyConfig: IStringifyOptions = {
        formatters: [
            { matches: 'string', params: { maxLength: 5 } },
            { matches: 'date', params: { timezone: 'Australia/Perth' } },
            {
                matches: (obj: any) => obj === 'SAMO',
                format: (_obj: any) => {
                    return 'BANU';
                },
            },
        ],
    };

    const d = stringify(bigJson, stringifyConfig);
    console.log(d);
};

// TODO: strinify of err failed after JSON.parse
main().catch((err) => {
    console.log(stringify(err));
});
