import _ from 'lodash';
import config from '../../../config';
import { formatFunction, ObjectFormatter } from '../../interface';
import { AllowedTimezone } from './timezones';

interface IDateFormatterConfig {
    matches: 'date';
    params?: {
        timezone?: AllowedTimezone;
        locale?: string;
    };
    format?: formatFunction;
}

const getCurrTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export type DateFormatterConfig = IDateFormatterConfig;

export const getDateFormatter = (formatterConfig: DateFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            date: { timezone, locale },
        },
    } = config;

    const dateFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return _.isDate(obj);
        },
    };

    const defaultFormatFunction = (date: Date) => {
        // TODO: maybe add enum of allowed timezones (maybe with new Date)
        const selectedTimezone = formatterConfig.params?.timezone ?? getCurrTimezone() ?? timezone;
        const selectedLocale = formatterConfig.params?.locale ?? locale;

        return new Date(date.toLocaleString(selectedLocale, { timeZone: selectedTimezone }));
    };

    dateFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    return dateFormatter;
};
