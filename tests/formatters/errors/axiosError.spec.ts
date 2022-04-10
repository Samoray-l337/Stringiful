import axios, { AxiosError } from 'axios';
import { getAxiosErrorFormatter } from '../../../src/formatters/errors/axiosError';
import { getFormattedObject } from '../../../src/formatters';
import { ObjectFormatter } from '../../../src/formatters/interface';

const getAxiosError = async (): Promise<AxiosError | any> => {
    try {
        await axios.get('http:localhost:8000/fake');
        throw new Error('Unexpected error, axios should throw');
    } catch (e) {
        return e;
    }
};

describe('AxiosError formatters tests', () => {
    const baseAxiosErrorFormatter = getAxiosErrorFormatter({ matches: 'axiosError' });
    const formatters = [baseAxiosErrorFormatter];

    describe('basic tests', () => {
        it('should format simple AxiosError', async () => {
            const axiosError = await getAxiosError();
            const formattedObject = getFormattedObject({ myError: axiosError }, formatters);

            expect(axiosError).toMatchObject(formattedObject.myError);
        });

        it('should format AxiosError with fieldsWhitelist', async () => {
            const customAxiosErrorFormatter: ObjectFormatter = { ...baseAxiosErrorFormatter, fieldsWhitelist: ['config'] };

            const axiosError = await getAxiosError();
            const formattedObject = getFormattedObject(axiosError, [customAxiosErrorFormatter]);

            expect(axiosError).toMatchObject(formattedObject);

            expect(Object.keys(formattedObject).length).toBe(1);
            expect(Object.keys(formattedObject)).toEqual(['config']);

            expect(formattedObject.config).toBeDefined();
        });

        it('should format AxiosError with fieldsBlacklist', async () => {
            const customAxiosErrorFormatter: ObjectFormatter = { ...baseAxiosErrorFormatter, fieldsBlacklist: ['config'] };

            const axiosError = await getAxiosError();
            const formattedObject = getFormattedObject(axiosError, [customAxiosErrorFormatter]);

            expect(axiosError).toMatchObject(formattedObject);
            expect(formattedObject.config).toBeUndefined();
        });
    });
});
