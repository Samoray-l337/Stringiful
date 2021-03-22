/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import { FormatterTypeOptions, IFormatterConfig, ObjectFormatter } from './interface';

import { getAxiosErrorFormatter } from './errors/axiosError';
import { getDateFormatter } from './simpleTypes/date';
import { getStringFormatter } from './simpleTypes/string';

const filterObjectPropertiesByWhitelist = (value: Object, allowedProperties: any[]) => {
    return _.pick(value, allowedProperties);
};

const filterObjectPropertiesByBlacklist = (value: Object, disallowedProperties: any[]) => {
    return _.omit(value, disallowedProperties);
};

const getRelevantFormatter = (formatterConfig: IFormatterConfig) => {
    switch (formatterConfig.matches) {
        case 'string':
            return getStringFormatter(formatterConfig);
        case 'axiosError':
            return getAxiosErrorFormatter(formatterConfig);
        case 'date':
            return getDateFormatter(formatterConfig);
        default:
            throw new Error('got unknown matches type');
    }
};

const mapValuesDeep = (obj: Object, formatters: ObjectFormatter[]) => {
    let formattedObject = obj;
    const currObjectFormatter = formatters.find((objectFormatter: ObjectFormatter) => objectFormatter.matches(obj));

    if (currObjectFormatter) {
        // TODO: think of the order of these
        if (currObjectFormatter.fieldsBlacklist) {
            formattedObject = filterObjectPropertiesByBlacklist(formattedObject, currObjectFormatter.fieldsBlacklist);
        }

        if (currObjectFormatter.fieldsWhitelist) {
            formattedObject = filterObjectPropertiesByWhitelist(formattedObject, currObjectFormatter.fieldsWhitelist);
        }

        if (currObjectFormatter.format) {
            formattedObject = currObjectFormatter.format(formattedObject);
        }

        return formattedObject;
    }

    return Array.isArray(formattedObject)
        ? _.map(formattedObject, (value: any) => mapValuesDeep(value, formatters))
        : _.isObject(formattedObject)
        ? _.mapValues(formattedObject, (value) => mapValuesDeep(value, formatters))
        : formattedObject;
};

export const getFormatters = (formattersConfig: IFormatterConfig[]): ObjectFormatter[] => {
    const newFormatters = formattersConfig.filter((formatterConfig) => {
        return !_.isString(formatterConfig.matches);
    });

    const knownFormattersConfigurations = formattersConfig.filter((formatterConfig) => {
        return _.isString(formatterConfig.matches);
    });

    const formatters = newFormatters.concat(knownFormattersConfigurations.map((formatterConfig) => getRelevantFormatter(formatterConfig)));

    const defaultFormatters = FormatterTypeOptions.map((formatterName) => getRelevantFormatter({ matches: formatterName }));
    return formatters.concat(defaultFormatters).filter(Boolean) as ObjectFormatter[];
};

export const getFormattedObject = (value: Object, formatters: ObjectFormatter[]) => {
    const formattedObject = mapValuesDeep(value, formatters);

    return formattedObject;
};
