import { getErrorFormatter } from '../../formatters/errors/error';
import { getFormattedObject } from '../../formatters/index';

describe('Error formatters tests', () => {
    const errorFormatter = getErrorFormatter({ matches: 'error' });
    const formatters = [errorFormatter];

    describe('basic test', () => {
        it('should stringify empty object', async () => {
            const formattedObject = getFormattedObject({}, formatters);

            expect(formattedObject).toEqual({});
        });
    });
});
