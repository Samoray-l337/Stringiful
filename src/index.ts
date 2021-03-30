import config from './config';
import { getFormatters } from './formatters';
import { IStringifyOptions } from './interface';
import { stringifyFunction } from './stringify';
import { validateDataWithSchema } from './utils/joi';
import { stringifyConfigSchema } from './validation.schema';

type stringifyFunctionType = (obj: any) => string;

/**
 * create a stringify function with specefic configuration for multiple uses
 *
 *
 * @param  {IStringifyOptions} options formatters configuration + inspect options (based on util.inspect)
 * @return {stringifyFunctionType} string presentation of the given object
 */
export const createStringifyFunction = (options: IStringifyOptions): stringifyFunctionType => {
    const formattedOptions = validateDataWithSchema(options, stringifyConfigSchema) as IStringifyOptions;
    const formatters = getFormatters(formattedOptions?.formatters ?? []);

    return (obj: any) => {
        return stringifyFunction(obj, formatters, formattedOptions.inspectOptions);
    };
};

/**
 * format + stringify an presented object
 *
 *
 * @param  {any} obj any object is accepted
 * @param  {IStringifyOptions?} options (optional) - formatters configuration + inspect options (based on util.inspect)
 * @return {String} string representation of the given object
 */
export function stringify(obj: Object, options?: IStringifyOptions): string {
    return createStringifyFunction(options ?? config.stringifyDefaultOptions)(obj);
}

// TODO: write in the documentation that the color will only work in ansi shell
