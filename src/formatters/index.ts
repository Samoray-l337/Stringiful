/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import { FormatterTypeOptions, IFormatterConfig, ObjectFormatter } from './interface';

import { getAxiosErrorFormatter } from './errors/axiosError';
import { getDateFormatter } from './primitiveTypes/date';
import { getStringFormatter } from './primitiveTypes/string';
import { getErrorFormatter } from './errors/error';

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
        case 'error':
            return getErrorFormatter(formatterConfig);
        default:
            throw new Error('got unknown matches type');
    }
};

const mapValuesDeep = (obj: Object, formatters: ObjectFormatter[]) => {
    let formattedObject = obj;
    const currObjectFormatter = formatters.find((objectFormatter: ObjectFormatter) => objectFormatter.matches(obj));

    if (currObjectFormatter) {
        // TODO: think of the order of these (whitelist/blacklist, format) (write about the order and why its important in the documentation)
        if (currObjectFormatter.fieldsBlacklist) {
            formattedObject = filterObjectPropertiesByBlacklist(formattedObject, currObjectFormatter.fieldsBlacklist);
        } else if (currObjectFormatter.fieldsWhitelist) {
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
    // group formatters configurations by their matches type (if its known formatter configuration or custom one of the user)
    const [knownFormattersConfigurations, newFormatters] = _.partition(formattersConfig, (formatterConfig) => _.isString(formatterConfig.matches));

    const knownFormatters = knownFormattersConfigurations.map((formatterConfig) => getRelevantFormatter(formatterConfig));
    const defaultFormatters = FormatterTypeOptions.map((formatterName) => getRelevantFormatter({ matches: formatterName }));

    const formatters = newFormatters.concat(knownFormatters).concat(defaultFormatters);

    return formatters.filter(Boolean) as ObjectFormatter[];
};

export const getFormattedObject = (value: Object, formatters: ObjectFormatter[]) => {
    const formattedObject = mapValuesDeep(value, formatters);

    return formattedObject;
};
