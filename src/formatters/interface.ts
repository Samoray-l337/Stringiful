import { AxiosErrorFormatterConfig } from './errors/axiosError';
import { StringFormatterConfig } from './primitives/string';

export type formatterType = 'string' | 'axiosError';

export type matchesFunction = (obj: any) => boolean;

interface IObjectFormatter {
    matches: matchesFunction;
    format?: (obj: any) => any;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

export type ObjectFormatter = IObjectFormatter;

export type IFormatterConfig = ObjectFormatter | StringFormatterConfig | AxiosErrorFormatterConfig;
