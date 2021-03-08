import _ from 'lodash';
import config from '../../config';
import { formatFunction, ObjectFormatter } from '../interface';

interface IDateFormatterConfig {
    matches: 'date';
    params?: {
        timezone?: string;
    };
    format?: formatFunction; // TODO: think about format here (can be only format or params not both (apply in another formatters also))
}

export type DateFormatterConfig = IDateFormatterConfig;

export const getDateFormatter = (formatterConfig: DateFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            date: { timezone },
        },
    } = config;

    const dateFormatter: ObjectFormatter = {
        matches: (obj: any) => {
            return _.isDate(obj);
        },
    };

    const defaultFormatFunction = (date: Date) => {
        const selectedTimezone = formatterConfig.params?.timezone ?? timezone;
        // eslint-disable-next-line no-console
        console.log(selectedTimezone);
        return date.toString();
    };

    dateFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    return dateFormatter;
};
