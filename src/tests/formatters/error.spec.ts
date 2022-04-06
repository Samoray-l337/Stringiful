import { getErrorFormatter } from '../../formatters/errors/error';
import { getFormattedObject } from '../../formatters/index';

describe('Error formatters tests', () => {
    const errorFormatter = getErrorFormatter({ matches: 'error', params: { maxMessageLength: 5 } });
    const formatters = [errorFormatter];

    describe('basic tests', () => {
        it('should formatt simple Error', async () => {
            const formattedObject = getFormattedObject(new Error(''), formatters);

            expect(formattedObject).toEqual(expect.objectContaining({ message: '' }));
            expect(formattedObject.stack).toBeDefined();
        });

        it('should formatt simple Error with long message', async () => {
            const formattedObject = getFormattedObject(new Error('what a giant error message'), formatters);

            expect(formattedObject).toEqual(expect.objectContaining({ message: 'what ...' }));
        });
    });
});
