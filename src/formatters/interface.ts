import { AxiosErrorFormatterConfig } from './errors/axiosError';
import { DateFormatterConfig } from './simpleTypes/date';
import { StringFormatterConfig } from './simpleTypes/string';

export type formatFunction = (obj: any) => any;
export type matchesFunction = (obj: any) => boolean;

interface IObjectFormatter {
    matches: matchesFunction;
    format?: formatFunction;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

export type ObjectFormatter = IObjectFormatter;

export type IFormatterConfig = ObjectFormatter | StringFormatterConfig | AxiosErrorFormatterConfig | DateFormatterConfig;
