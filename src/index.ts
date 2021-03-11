import config from './config';
import { getFormatters } from './formatters';
import { IStringifyOptions } from './interfaces';
import { stringifyFunction } from './stringify';
import { validateDataWithSchema } from './utils/joi';
import { stringifyConfigSchema } from './validation.schema';

type stringifyFunctionType = (obj: any) => string;

export const createStringifyFunction = (options: IStringifyOptions): stringifyFunctionType => {
    const formattedOptions = validateDataWithSchema(options, stringifyConfigSchema) as IStringifyOptions;
    const formatters = getFormatters(formattedOptions?.formatters ?? []);

    return (obj: any) => {
        return stringifyFunction(obj, formatters, options.inspectOptions);
    };
};

export function stringify(obj: Object, options?: IStringifyOptions) {
    return createStringifyFunction(options ?? config.stringifyDefaultOptions)(obj);
}
