import _ from 'lodash';
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

// TODO: think about recusivlly format things also inside axiosError etc (for an examples, strings inside the axios error should be formetted also or not?)
export const getAxiosErrorFormatter = (formatterConfig: AxiosErrorFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            axiosError: { maxResponseDataLength, maxRequestDataLength, allowedProperties },
        },
    } = config;

    const baseAxiosErrorFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return Boolean(obj?.isAxiosError);
        },
    };

    const defaultFormatFunction = (axiosError: object) => {
        const selectedMaxResponseDataLength = formatterConfig.params?.maxResponseDataLength ?? maxResponseDataLength;
        const selectedMaxRequestDataLength = formatterConfig.params?.maxRequestDataLength ?? maxRequestDataLength;

        const formattedRequestData = _.get(axiosError, 'config.data')?.substring?.(0, selectedMaxResponseDataLength);
        if (formattedRequestData) {
            _.set(axiosError, 'config.data', formattedRequestData);
        }

        const formattedResponseData = _.get(axiosError, 'response.data')?.substring?.(0, selectedMaxRequestDataLength);
        if (formattedResponseData) {
            _.set(axiosError, 'response.data', formattedResponseData);
        }

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
