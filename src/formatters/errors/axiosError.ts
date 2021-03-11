import config from '../../config';
import { ObjectFormatter, formatFunction } from '../interface';

type axiosErrorParams = {
    maxResponseDataLength?: number;
    maxRequestDataLength?: number;
};

interface IAxiosErrorFormatterConfig {
    matches: 'axiosError';
    params?: axiosErrorParams;
    format?: formatFunction;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

export type AxiosErrorFormatterConfig = IAxiosErrorFormatterConfig;

export const getAxiosErrorFormatter = (formatterConfig: AxiosErrorFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            axiosError: { maxResponseDataLength, maxRequestDataLength, allowedProperties },
        },
    } = config;

    const baseAxiosErrorFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return !!obj.isAxiosError;
        },
    };

    const defaultFormatFunction = (axiosError: object) => {
        // TODO: reduce the size of response and request data length here
        // eslint-disable-next-line no-console
        console.log(maxRequestDataLength, maxResponseDataLength);
        return axiosError;
    };

    baseAxiosErrorFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    const { fieldsBlacklist } = formatterConfig;
    const { fieldsWhitelist } = formatterConfig;
    if (fieldsWhitelist) {
        return { ...baseAxiosErrorFormatter, fieldsWhitelist };
    }

    if (fieldsBlacklist) {
        return { ...baseAxiosErrorFormatter, fieldsBlacklist };
    }

    return { ...baseAxiosErrorFormatter, fieldsWhitelist: allowedProperties };
};
