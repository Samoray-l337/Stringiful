import { IStringifyOptions, createStringifyFunction } from '../index';

const testConfig: IStringifyOptions = {
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
        depth: Infinity,
    },
};

describe('Channel tests', () => {
    const stringify = createStringifyFunction(testConfig);

    describe('basic test', () => {
        it('should stringify empty object', async () => {
            const result = stringify({});

            expect(result).toEqual('{}');
        });

        it('should stringify basic object', async () => {
            const result = stringify({ a: '' });

            expect(result).toEqual(`{ a: '' }`);
        });
    });

    describe('another tests', () => {
        it('should stringify another basic object', async () => {
            const result = stringify({ b: '' });

            expect(result).toEqual(`{ b: '' }`);
        });
    });
});
