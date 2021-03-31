import { AxiosErrorFormatterConfig } from './errors/axiosError';
import { DateFormatterConfig } from './primitiveTypes/date';
import { StringFormatterConfig } from './primitiveTypes/string';

export type formatFunction = (obj: any) => any;
export type matchesFunction = (obj: any) => boolean;

interface IObjectFormatter {
    matches: matchesFunction;
    format?: formatFunction;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

export const FormatterTypeOptions = ['string', 'axiosError', 'date'] as const;
export type FormatterType = typeof FormatterTypeOptions[number];

export type ObjectFormatter = IObjectFormatter;

export type IFormatterConfig = ObjectFormatter | StringFormatterConfig | AxiosErrorFormatterConfig | DateFormatterConfig;
