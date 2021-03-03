/* eslint-disable no-redeclare */
import { inspect } from 'util';
import config from './config';
import { getFormattedObject } from './formatters';
import { IStringifyOptions } from './interfaces';

type stringifyFunction = (obj: any) => string;

export function stringify(obj: Object, options?: IStringifyOptions) {
    const formattedObject = getFormattedObject(obj, options?.formatters ?? []);

    return inspect(formattedObject, options?.inspectOptions ?? config.stringifyDefaultOptions);
}

export const createStringifyFunction = (options: IStringifyOptions): stringifyFunction => {
    return (obj: any) => {
        const formattedObject = getFormattedObject(obj, options?.formatters ?? []);

        return inspect(formattedObject, { ...options.inspectOptions });
    };
};
