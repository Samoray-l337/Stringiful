import { IAxiosErrorFormatterConfig } from './axiosError';
import { IStringFormatterConfig } from './string';

export type formatterType = 'string' | 'axiosError';

export type matchesFunction = (obj: any) => boolean;

export interface IObjectFormatter {
    matches: matchesFunction;
    format?: (obj: any) => any;
    fieldsWhiteList?: string[];
    fieldsBlackList?: string[];
}

export type IFormatterConfig = IObjectFormatter | IStringFormatterConfig | IAxiosErrorFormatterConfig;
