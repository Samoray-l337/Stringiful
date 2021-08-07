/* eslint-disable max-classes-per-file */
/* eslint-disable no-new-wrappers */
/* eslint-disable no-console */
// TODO: think about exports isPlainObject , isString etc.
import * as util from 'util';
import { stringify, createStringifyFunction, IStringifyOptions } from '..';

class SimpleRectangle {
    width: number;
    height: number;
    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
}

class CustomStringRepresentationRectangle {
    width: number;
    height: number;
    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }

    [util.inspect.custom]() {
        return `my width is ${this.width} and my height is ${this.height}`;
    }
}

const bigJson = {
    glossary: {
        title: 'example glossary',
        GlossDiv: {
            title: 'S',
            GlossList: {
                GlossEntry: {
                    ID: 'SGML',
                    NAME: 'SAMO',
                    matchEmail: new RegExp('.*asd.8'),
                    simpleCustomClass: new SimpleRectangle(100, 100),
                    customClass: new CustomStringRepresentationRectangle(100, 100),
                    specialString: new String('asdasdasd'),
                    specialNumber: new Number(12312),
                    DateT: new Date(),
                    SortAs: new Error('assad'),
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
            { matches: 'error', params: { maxMessageLength: 5 }, fieldsWhitelist: ['message'] },
            { matches: 'date', params: { timezone: 'Australia/Perth' } },
            {
                matches: (obj: any) => obj === 'SAMO',
                format: (_obj: any) => {
                    return 'BANU';
                },
            },
        ],
        inspectOptions: {
            colors: true,
        },
    };

    const d = stringify(bigJson, stringifyConfig);
    console.log(d);
};

main().catch((err) => {
    console.log(stringify(err, { inspectOptions: { colors: true } }));
});
