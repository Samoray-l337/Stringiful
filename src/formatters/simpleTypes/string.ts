import _ from 'lodash';
import config from '../../config';
import { formatFunction, ObjectFormatter } from '../interface';

interface IStringFormatterConfig {
    matches: 'string';
    params?: {
        maxLength?: number;
    };
    format?: formatFunction; // TODO: think about format here (can be only format or params not both (apply in another formatters also))
}

export type StringFormatterConfig = IStringFormatterConfig;

export const getStringFormatter = (formatterConfig: StringFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            string: { maxLength },
        },
    } = config;

    const stringFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return _.isString(obj);
        },
    };

    const defaultFormatFunction = (str: string) => {
        const selectedMaxLength = formatterConfig.params?.maxLength ?? maxLength;

        return str.length > selectedMaxLength ? `${str.slice(0, selectedMaxLength)}...` : str;
    };

    stringFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    return stringFormatter;
};
