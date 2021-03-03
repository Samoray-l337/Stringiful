import config from '../config';
import { IObjectFormatter } from './interface';

export interface IAxiosErrorFormatterConfig {
    matches: 'axiosError';
    params?: {
        maxResponseDataLength?: number;
        maxRequestDataLength?: number;
    };
    fieldsWhiteList?: string[];
    fieldsBlackList?: string[];
}

// interface IAxiosErrorWhitelistFormatterConfig extends IAxiosErrorFormatterConfig {
//     fieldsWhiteList?: string[];
// }

// interface IAxiosErrorBlacklistFormatterConfig extends IAxiosErrorFormatterConfig {
//     fieldsBlackList?: string[];
// }

// export type AxiosErrorFormatterConfig = IAxiosErrorBlacklistFormatterConfig | IAxiosErrorWhitelistFormatterConfig;

export const getAxiosErrorFormatter = (formatterConfig: IAxiosErrorFormatterConfig): IObjectFormatter => {
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

    const { fieldsBlackList } = formatterConfig;
    const { fieldsWhiteList } = formatterConfig;
    if (fieldsWhiteList) {
        return { ...baseAxiosErrorFormatter, fieldsWhiteList };
    }

    if (fieldsBlackList) {
        return { ...baseAxiosErrorFormatter, fieldsBlackList };
    }

    return { ...baseAxiosErrorFormatter, fieldsWhiteList: allowedProperties };
};
