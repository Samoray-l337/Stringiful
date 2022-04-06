import { getErrorFormatter } from '../../formatters/errors/error';
import { getFormattedObject } from '../../formatters/index';

describe('Error formatters tests', () => {
    const errorFormatter = getErrorFormatter({ matches: 'error', params: { maxMessageLength: 5 } });
    const formatters = [errorFormatter];

    describe('basic tests', () => {
        it('should format simple Error', () => {
            const formattedObject = getFormattedObject(new Error(''), formatters);

            expect(formattedObject).toEqual(expect.objectContaining({ message: '' }));
            expect(formattedObject.stack).toBeDefined();
        });

        it('should format simple Error with long message', () => {
            const formattedObject = getFormattedObject(new Error('what a giant error message'), formatters);

            expect(formattedObject).toEqual(expect.objectContaining({ message: 'what ...' }));
        });
    });
});
