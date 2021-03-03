/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import { getAxiosErrorFormatter, IAxiosErrorFormatterConfig } from './axiosError';

import { IFormatterConfig, IObjectFormatter } from './interface';
import { getStringFormatter, IStringFormatterConfig } from './string';

const filterObjectPropertiesByWhitelist = (value: Object, allowedProperties: any[]) => {
    return _.pick(value, allowedProperties);
};

const filterObjectPropertiesByBlacklist = (value: Object, disallowedProperties: any[]) => {
    return _.omit(value, disallowedProperties);
};

const getFormatters = (formattersConfig: IFormatterConfig[]): IObjectFormatter[] => {
    const formatters = formattersConfig.map((formatterConfig) => {
        if (_.isString(formatterConfig.matches)) {
            switch (formatterConfig.matches) {
                case 'string':
                    return getStringFormatter(formatterConfig as IStringFormatterConfig);
                case 'axiosError':
                    return getAxiosErrorFormatter(formatterConfig as IAxiosErrorFormatterConfig);
                default:
                    return undefined;
            }
        }
        return formatterConfig as IObjectFormatter;
    });

    return formatters.filter(Boolean) as IObjectFormatter[];
};

const mapValuesDeep = (obj: Object, formatters: IObjectFormatter[]) => {
    let formattedObject = obj;
    const currObjectFormatter = formatters.find((objectFormatter: IObjectFormatter) => objectFormatter.matches(obj));

    if (currObjectFormatter) {
        if (currObjectFormatter.fieldsBlackList) {
            formattedObject = filterObjectPropertiesByBlacklist(formattedObject, currObjectFormatter.fieldsBlackList);
        }

        if (currObjectFormatter.fieldsWhiteList) {
            formattedObject = filterObjectPropertiesByWhitelist(formattedObject, currObjectFormatter.fieldsWhiteList);
        }

        if (currObjectFormatter.format) {
            return currObjectFormatter.format(formattedObject);
        }
    }

    return Array.isArray(formattedObject)
        ? _.map(formattedObject, (value: any) => mapValuesDeep(value, formatters))
        : _.isObject(formattedObject)
        ? _.mapValues(formattedObject, (value) => mapValuesDeep(value, formatters))
        : formattedObject;
};

export const getFormattedObject = (value: Object, formattersConfig: IFormatterConfig[]) => {
    const formatters = getFormatters(formattersConfig);

    const formattedObject = mapValuesDeep(value, formatters);

    return formattedObject;
};
