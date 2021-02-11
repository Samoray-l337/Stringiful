import pick from 'lodash.pick';
import axios, { AxiosError } from 'axios';
import config from './config';

const filterObjectProperties = (value: Object, allowedProperties: string[]) => {
    return pick(value, allowedProperties);
};

const isResponseDataTooBig = (value: AxiosError) => {
    const { maxAxiosResponseContentLengthToShow } = config;

    return value.config.headers['Content-Length'] ? value.config.headers['Content-Length'] > maxAxiosResponseContentLengthToShow : false;
};

export const getFormattedErrorObject = (value: Object) => {
    if (value instanceof Error) {
        const allowedErrorProperties = ['message', 'stack'];

        if (axios.isAxiosError(value)) {
            const allowedAxiosErrorProperties = [
                'response.status',
                'response.statusText',
                'response.headers',
                'config.baseURL',
                'config.url',
                'config.method',
                'config.headers',
                'config.timeout',
                'config.maxContentLength',
                'config.maxBodyLength',
                'isAxiosError',
            ];

            if (!isResponseDataTooBig(value)) {
                allowedAxiosErrorProperties.push('config.data');
            }

            allowedErrorProperties.push(...allowedAxiosErrorProperties);
        }

        return filterObjectProperties(value, allowedErrorProperties);
    }

    return value;
};
