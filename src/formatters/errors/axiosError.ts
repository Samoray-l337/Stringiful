import config from '../../config';
import { ObjectFormatter, formatFunction } from '../interface';

type axiosErrorParams = {
    maxResponseDataLength?: number;
    maxRequestDataLength?: number;
};

// TODO: dont allow params and format together + have to be at least one of all (format, whitelist, blacklist, params)
interface IAxiosErrorFormatterConfig {
    matches: 'axiosError';
    params?: axiosErrorParams;
    format?: formatFunction;
}

interface IAxiosErrorWhitelistFormatterConfig extends IAxiosErrorFormatterConfig {
    fieldsWhitelist?: string[];
    fieldsBlacklist?: never;
}

interface IAxiosErrorBlacklistFormatterConfig extends IAxiosErrorFormatterConfig {
    fieldsBlacklist?: string[];
    fieldsWhitelist?: never;
}

export type AxiosErrorFormatterConfig = IAxiosErrorWhitelistFormatterConfig | IAxiosErrorBlacklistFormatterConfig;

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

    const { fieldsBlacklist } = formatterConfig as IAxiosErrorBlacklistFormatterConfig;
    const { fieldsWhitelist } = formatterConfig as IAxiosErrorWhitelistFormatterConfig;
    if (fieldsWhitelist) {
        return { ...baseAxiosErrorFormatter, fieldsWhitelist };
    }

    if (fieldsBlacklist) {
        return { ...baseAxiosErrorFormatter, fieldsBlacklist };
    }

    return { ...baseAxiosErrorFormatter, fieldsWhitelist: allowedProperties };
};
