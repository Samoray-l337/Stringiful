import _ from 'lodash';
import config from '../../config';
import { formatFunction, ObjectFormatter } from '../interface';

interface IStringFormatterConfig {
    matches: 'string';
    params?: {
        maxLength?: number;
        overflowSuffix?: string;
    };
    format?: formatFunction;
}

export type StringFormatterConfig = IStringFormatterConfig;

export const getStringFormatter = (formatterConfig: StringFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            string: { maxLength, overflowSuffix },
        },
    } = config;

    const stringFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return _.isString(obj);
        },
    };

    const defaultFormatFunction = (str: string) => {
        const selectedMaxLength = formatterConfig.params?.maxLength ?? maxLength;
        const selectedOverflowSuffix = formatterConfig.params?.overflowSuffix ?? overflowSuffix;

        return str.length > selectedMaxLength ? `${str.slice(0, selectedMaxLength)}${selectedOverflowSuffix}` : str;
    };

    stringFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    return stringFormatter;
};
