import { inspect, InspectOptions } from 'util';
import config from './config';
import { getFormattedObject } from './formatters';
import { ObjectFormatter } from './formatters/interface';

export const stringifyFunction = (obj: any, formatters: ObjectFormatter[], inspectOptions?: InspectOptions) => {
    const selectedInspectOptions = inspectOptions ?? config.stringifyDefaultOptions.inspectOptions;
    const formattedObject = getFormattedObject(obj, formatters);

    return inspect(formattedObject, { ...selectedInspectOptions });
};
