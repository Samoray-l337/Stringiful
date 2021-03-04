import config from '../../config';
import { ObjectFormatter } from '../interface';

interface IAxiosErrorFormatterConfig {
    matches: 'axiosError';
    params?: {
        maxResponseDataLength?: number;
        maxRequestDataLength?: number;
    };
}

interface IAxiosErrorWhitelistFormatterConfig extends IAxiosErrorFormatterConfig {
    fieldsWhitelist: string[];
}

interface IAxiosErrorBlacklistFormatterConfig extends IAxiosErrorFormatterConfig {
    fieldsBlacklist: string[];
}

export type AxiosErrorFormatterConfig = IAxiosErrorFormatterConfig | IAxiosErrorWhitelistFormatterConfig | IAxiosErrorBlacklistFormatterConfig;

export const getAxiosErrorFormatter = (formatterConfig: AxiosErrorFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            axiosError: { maxResponseDataLength, maxRequestDataLength, allowedProperties },
        },
    } = config;

    const baseAxiosErrorFormatter = {
        matches: (obj: any) => {
            return !!obj.isAxiosError;
        },
        format: (axiosError: object) => {
            // eslint-disable-next-line no-console
            console.log(maxRequestDataLength, maxResponseDataLength);
            return axiosError;
        },
    };

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
