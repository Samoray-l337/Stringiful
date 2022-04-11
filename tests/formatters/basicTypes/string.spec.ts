import { getStringFormatter } from '../../../src/formatters/basicTypes/string';
import { getFormattedObject } from '../../../src/formatters/index';

describe('String formatter tests', () => {
    const stringFormatter = getStringFormatter({ matches: 'string', params: { maxLength: 10 } });
    const formatters = [stringFormatter];

    describe('basic tests', () => {
        it('simple & short string should remain the same', () => {
            const simpleString = 'hello';

            const formattedString = getFormattedObject(simpleString, formatters);

            expect(formattedString).toEqual(simpleString);
        });

        it('should format long string', () => {
            const longString = 'hello world what a long message';

            const formattedString = getFormattedObject(longString, formatters);
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

            const formattedObject = getFormattedObject(nastedObject, formatters);
            expect(formattedObject?.a?.b?.myStr).toBeDefined();
            expect(formattedObject?.a?.b?.myStr).toEqual('hello worl...');
        });
    });
});
