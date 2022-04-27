import { getStringFormatter } from '../../../src/formatters/basicTypes/string';
import { getFormattedObject } from '../../../src/formatters/index';

describe('String formatter tests', () => {
    describe('basic tests', () => {
        const basicStringFormatter = getStringFormatter({ matches: 'string', params: { maxLength: 10 } });

        it('simple & short string should remain the same', () => {
            const simpleString = 'hello';

            const formattedString = getFormattedObject(simpleString, [basicStringFormatter]);

            expect(formattedString).toEqual(simpleString);
        });

        it('should format long string', () => {
            const longString = 'hello world what a long message';

            const formattedString = getFormattedObject(longString, [basicStringFormatter]);
            expect(formattedString).toEqual('hello worl...');
        });

        it('should format long string inside nasted object', () => {
            const longString = 'hello world what a long message';
            const nastedObject = {
                a: {
                    b: {
                        myStr: longString,
                    },
                },
            };

            const formattedObject = getFormattedObject(nastedObject, [basicStringFormatter]);
            expect(formattedObject?.a?.b?.myStr).toBeDefined();
            expect(formattedObject?.a?.b?.myStr).toEqual('hello worl...');
        });
    });

    describe('configuration tests', () => {
        const stringFormatter = getStringFormatter({ matches: 'string', params: { maxLength: 5, overflowSuffix: '<->' } });
        const stringFormatterWithNoSuffix = getStringFormatter({ matches: 'string', params: { maxLength: 5, overflowSuffix: '' } });

        it('should put empty suffix if configured so, when string length overflowed the allowed length ', () => {
            const longString = 'hello world what a long message';

            const formattedString = getFormattedObject(longString, [stringFormatterWithNoSuffix]);

            expect(formattedString).toEqual('hello');
        });

        it('should put suffix as configured when string length overflowed the allowed length ', () => {
            const longString = 'hello world what a long message';

            const formattedString = getFormattedObject(longString, [stringFormatter]);

            expect(formattedString).toEqual('hello<->');
        });
    });
});
