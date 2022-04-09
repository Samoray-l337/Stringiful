/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import { FormatterTypeOptions, IFormatterConfig, ObjectFormatter } from './interface';

import { getAxiosErrorFormatter } from './errors/axiosError';
import { getDateFormatter } from './basicTypes/date';
import { getStringFormatter } from './basicTypes/string';
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

const formatObjectWithFormatter = (obj: any, relevantFormatter: ObjectFormatter) => {
    // TODO: think of the order of these (whitelist/blacklist, format) (write about the order and why its important in the documentation)
    let formattedObject = obj;

    if (relevantFormatter.fieldsBlacklist) {
        formattedObject = filterObjectPropertiesByBlacklist(formattedObject, relevantFormatter.fieldsBlacklist);
    } else if (relevantFormatter.fieldsWhitelist) {
        formattedObject = filterObjectPropertiesByWhitelist(formattedObject, relevantFormatter.fieldsWhitelist);
    }

    if (relevantFormatter.format) {
        formattedObject = relevantFormatter.format(formattedObject);
    }

    return formattedObject;
};

const mapValuesDeep = (obj: Object, formatters: ObjectFormatter[], set = new Set<any>()) => {
    // if we saw that object already it is circular object so we can ignore it
    if (_.isPlainObject(obj) && set.has(obj)) {
        return '[Circular Object]';
    }

    set.add(obj);

    const currObjectFormatter = formatters.find((objectFormatter: ObjectFormatter) => objectFormatter.matches(obj));

    if (currObjectFormatter) {
        return formatObjectWithFormatter(obj, currObjectFormatter);
    }

    return Array.isArray(obj)
        ? _.map(obj, (value: any) => mapValuesDeep(value, formatters, set))
        : _.isPlainObject(obj)
        ? _.mapValues(obj, (value) => mapValuesDeep(value, formatters, set))
        : obj;
};

export const getFormatters = (formattersConfig: IFormatterConfig[]): ObjectFormatter[] => {
    // group formatters configurations by their matches type (if its known formatter configuration or custom one of the user)
    const [knownFormattersConfigurations, newFormatters] = _.partition(formattersConfig, (formatterConfig: IFormatterConfig) =>
        _.isString(formatterConfig.matches),
    );

    const knownFormatters = knownFormattersConfigurations.map(getRelevantFormatter);
    const defaultFormatters = FormatterTypeOptions.map((formatterName) => getRelevantFormatter({ matches: formatterName }));

    const formatters = newFormatters.concat(knownFormatters).concat(defaultFormatters);

    return formatters.filter(Boolean) as ObjectFormatter[];
};

export const getFormattedObject = (value: Object, formatters: ObjectFormatter[]) => {
    const formattedObject = mapValuesDeep(value, formatters);

    return formattedObject;
};
