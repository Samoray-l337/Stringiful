import _ from 'lodash';
import config from '../config';
import { IObjectFormatter } from './interface';

export interface IStringFormatterConfig {
    matches: 'string';
    params?: {
        maxLength?: number;
    };
}

export const getStringFormatter = (formatterConfig: IStringFormatterConfig): IObjectFormatter => {
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
            return `${str.slice(0, formatterConfig.params?.maxLength ?? maxLength)}...`;
        },
    };

    return stringFormatter;
};
