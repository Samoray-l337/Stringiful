import _ from 'lodash';
import config from '../../config';
import { ObjectFormatter, formatFunction } from '../interface';

// TODO: add generic axios formatter file because axiosError.ts and axiosResponse.ts is almost the same ( also change in the config)

type axiosResponseParams = {
    maxResponseDataLength?: number;
    maxRequestDataLength?: number;
};

interface IAxiosResponseFormatterConfig {
    matches: 'axiosResponse';
    params?: axiosResponseParams;
    format?: formatFunction;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

export type AxiosResponseFormatterConfig = IAxiosResponseFormatterConfig;

export const isAxiosResponse = (_obj: any) => {
    return false;
};

export const getAxiosResponseFormatter = (formatterConfig: AxiosResponseFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            axiosResponse: { maxResponseDataLength, maxRequestDataLength, allowedProperties },
        },
    } = config;

    const baseAxiosResponseFormatter: ObjectFormatter = {
        matches: isAxiosResponse,
    };

    const defaultFormatFunction = (axiosResponse: object) => {
        const selectedMaxResponseDataLength = formatterConfig.params?.maxResponseDataLength ?? maxResponseDataLength;
        const selectedMaxRequestDataLength = formatterConfig.params?.maxRequestDataLength ?? maxRequestDataLength;

        const formattedRequestData = _.get(axiosResponse, 'config.data')?.substring?.(0, selectedMaxResponseDataLength);
        if (formattedRequestData) {
            _.set(axiosResponse, 'config.data', formattedRequestData);
        }

        const formattedResponseData = _.get(axiosResponse, 'response.data')?.substring?.(0, selectedMaxRequestDataLength);
        if (formattedResponseData) {
            _.set(axiosResponse, 'response.data', formattedResponseData);
        }

        return axiosResponse;
    };

    baseAxiosResponseFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    const { fieldsBlacklist, fieldsWhitelist } = formatterConfig;
    if (fieldsWhitelist) {
        return { ...baseAxiosResponseFormatter, fieldsWhitelist };
    }

    if (fieldsBlacklist) {
        return { ...baseAxiosResponseFormatter, fieldsBlacklist };
    }

    return { ...baseAxiosResponseFormatter, fieldsWhitelist: allowedProperties };
};
