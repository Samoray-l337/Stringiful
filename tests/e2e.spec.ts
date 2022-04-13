import { IStringifyOptions, createStringifyFunction } from '../src';

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
        it('should stringify empty object', () => {
            const result = stringify({});

            expect(result).toBe('{}');
        });

        it('should stringify object with one empty field', () => {
            const result = stringify({ a: '' });

            expect(result).toBe("{ a: '' }");
        });

        it('should stringify object with multiple fields', () => {
            const result = stringify({ a: 'hello', b: 'world' });

            expect(result).toBe("{ a: 'hello', b: 'world' }");
        });
    });

    describe('advaneced tests', () => {
        it('should stringify another basic object', () => {
            const result = stringify({ b: '' });

            expect(result).toBe("{ b: '' }");
        });
    });
});
