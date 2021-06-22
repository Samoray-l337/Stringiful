import _ from 'lodash';
import config from '../../config';
import { ObjectFormatter, formatFunction } from '../interface';
import { isAxiosError } from './axiosError';

type errorParams = {
    maxMessageLength: number;
};

interface IErrorFormatterConfig {
    matches: 'error';
    params?: errorParams;
    format?: formatFunction;
    fieldsWhitelist?: string[];
    fieldsBlacklist?: string[];
}

export type ErrorFormatterConfig = IErrorFormatterConfig;

export const getErrorFormatter = (formatterConfig: ErrorFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            error: { maxMessageLength, allowedProperties },
        },
    } = config;

    const baseErrorFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return !isAxiosError(obj) && obj instanceof Error; // TODO: discuss about !isAxiosError here
        },
    };

    const defaultFormatFunction = (error: object) => {
        const selectedMaxMessageLength = formatterConfig.params?.maxMessageLength ?? maxMessageLength;

        const formattedMessage = _.get(error, 'message')?.substring?.(0, selectedMaxMessageLength);
        if (formattedMessage) {
            _.set(error, 'message', formattedMessage);
        }

        return error;
    };

    baseErrorFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    const { fieldsBlacklist, fieldsWhitelist } = formatterConfig;
    if (fieldsWhitelist) {
        return { ...baseErrorFormatter, fieldsWhitelist };
    }

    if (fieldsBlacklist) {
        return { ...baseErrorFormatter, fieldsBlacklist };
    }

    return { ...baseErrorFormatter, fieldsWhitelist: allowedProperties };
};
