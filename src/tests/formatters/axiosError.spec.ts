import axios from 'axios';
import { getAxiosErrorFormatter } from '../../formatters/errors/axiosError';
import { getFormattedObject } from '../../formatters/index';

const getAxiosError = async () => {
    try {
        await axios.get('http:localhost:8000/fake');
        throw new Error('Unexpected error, axios should throw');
    } catch (e) {
        return e;
    }
};

describe('AxiosError formatters tests', () => {
    const axiosErrorFormatter = getAxiosErrorFormatter({ matches: 'axiosError' });
    const formatters = [axiosErrorFormatter];

    describe('basic tests', () => {
        it('should formatt simple AxiosError', async () => {
            const axiosError = await getAxiosError();
            const formattedObject = getFormattedObject({ myError: axiosError }, formatters);

            expect(axiosError).toMatchObject(formattedObject.myError);
        });

        it('should formatt simple Error with long message', () => {});
    });
});
