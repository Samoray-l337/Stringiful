/* eslint-disable no-redeclare */
import { inspect } from 'util';
import config from './config';
import { getFormattedObject } from './formatters';
import { IStringifyOptions } from './interfaces';
import { validateDataWithSchema } from './utils/joi';
import { stringifyConfigSchema } from './validation.schema';

type stringifyFunction = (obj: any) => string;

// TODO: make it more efficient by storing the formatters once started
export const createStringifyFunction = (options: IStringifyOptions): stringifyFunction => {
    const formattedOptions = validateDataWithSchema(options, stringifyConfigSchema) as IStringifyOptions;

    return (obj: any) => {
        const formattedObject = getFormattedObject(obj, formattedOptions?.formatters ?? []);

        return inspect(formattedObject, { ...formattedOptions.inspectOptions });
    };
};

export function stringify(obj: Object, options?: IStringifyOptions) {
    return createStringifyFunction(options ?? config.stringifyDefaultOptions)(obj);
}
