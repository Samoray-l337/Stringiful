import { AxiosErrorFormatterConfig } from './errors/axiosError';
import { ErrorFormatterConfig } from './errors/error';
import { DateFormatterConfig } from './basicTypes/date';
import { StringFormatterConfig } from './basicTypes/string';

export type formatFunction = (obj: any) => any;
export type matchesFunction = (obj: any) => boolean;

interface IObjectFormatter {
    matches: matchesFunction;
    format?: formatFunction;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

// TODO: does the error formatter should be after every other error formatter (axiosError, etc...) ? (look at src\formatters\errors\error.ts:29)
export const FormatterTypeOptions = ['date', 'axiosError', 'string', 'error'] as const;
export type FormatterType = typeof FormatterTypeOptions[number];

export type ObjectFormatter = IObjectFormatter;

export type IFormatterConfig = ObjectFormatter | StringFormatterConfig | AxiosErrorFormatterConfig | DateFormatterConfig | ErrorFormatterConfig;
