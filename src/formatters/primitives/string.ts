import _ from 'lodash';
import config from '../../config';
import { ObjectFormatter } from '../interface';

interface IStringFormatterConfig {
    matches: 'string';
    params?: {
        maxLength?: number;
    };
    // format?: (obj: any) => any; // TODO: think about format here (can be only format or params not both (apply in another formatters also))
}

export type StringFormatterConfig = IStringFormatterConfig;

export const getStringFormatter = (formatterConfig: IStringFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            string: { maxLength },
        },
    } = config;

    const stringFormatter = {
        matches: (obj: any) => {
            return _.isString(obj);
        },
        format: (str: string) => {
            // TODO: the ... need to be only if the string is longer than the maxLength
            return `${str.slice(0, formatterConfig.params?.maxLength ?? maxLength)}...`;
        },
    };

    return stringFormatter;
};
