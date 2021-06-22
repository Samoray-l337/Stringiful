import { AxiosErrorFormatterConfig } from './errors/axiosError';
import { ErrorFormatterConfig } from './errors/error';
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

// the error formatter should be after axiosError
export const FormatterTypeOptions = ['date', 'axiosError', 'string', 'error'] as const;
export type FormatterType = typeof FormatterTypeOptions[number];

export type ObjectFormatter = IObjectFormatter;

export type IFormatterConfig = ObjectFormatter | StringFormatterConfig | AxiosErrorFormatterConfig | DateFormatterConfig | ErrorFormatterConfig;
