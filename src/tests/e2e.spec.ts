import { IStringifyOptions, createStringifyFunction } from '../index';

const testConfig: IStringifyOptions = {
    formatters: [{ matches: 'string', params: { maxLength: 5 } }],
    inspectOptions: {
        colors: false,
        depth: Infinity,
    },
};

describe('Channel tests', () => {
    const stringify = createStringifyFunction(testConfig);

    describe('basic tests', () => {
        it('should stringify empty object', async () => {
            const result = stringify({});

            expect(result).toBe('{}');
        });

        it('should stringify object with one empty field', async () => {
            const result = stringify({ a: '' });

            expect(result).toBe("{ a: '' }");
        });

        it('should stringify object with multiple fields', async () => {
            const result = stringify({ a: 'hello', b: 'world' });

            expect(result).toBe("{ a: 'hello', b: 'world' }");
        });
    });

    describe('advaneced tests', () => {
        it('should stringify another basic object', async () => {
            const result = stringify({ b: '' });

            expect(result).toBe("{ b: '' }");
        });
    });
});
