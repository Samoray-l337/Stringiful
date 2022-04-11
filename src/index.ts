import config from './config';
import { getFormattedObject, getFormatters } from './formatters';
import { IFormatObjectOptions, IStringifyOptions } from './interface';
import { stringifyFunction } from './stringify';
import { validateDataWithSchema } from './utils/joi';
import { stringifyConfigSchema } from './validation.schema';

type StringifyFunctionType = (obj: any) => string;
type FormattingFunctionType = <T = any>(obj: T) => T;

/**
 * create a stringify function with specefic configuration for multiple uses
 *
 *
 * @param  {IStringifyOptions} options formatters configuration + inspect options (based on util.inspect)
 * @return {StringifyFunctionType} configured stringify function
 */
export const createStringifyFunction = (options: IStringifyOptions): StringifyFunctionType => {
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

/**
 * create a formatting function with specefic configuration for multiple uses
 *
 *
 * @param  {IFormatObjectOptions?} options (optional) - formatters configuration
 * @return {FormattingFunctionType} configured formatObject function
 */
export function createFormattingFunction(options?: IFormatObjectOptions): FormattingFunctionType {
    const formattedOptions = validateDataWithSchema(options, stringifyConfigSchema) as IFormatObjectOptions;
    const formatters = getFormatters(formattedOptions?.formatters ?? []);

    return (obj: any) => {
        return getFormattedObject(obj, formatters);
    };
}
/**
 * format an presented object
 *
 *
 * @param  {any} obj any object is accepted
 * @param  {IFormatObjectOptions?} options (optional) - formatters configuration
 * @return {any} the formatted object
 */
export function formatObject<T = any>(obj: T, options?: IFormatObjectOptions): T {
    return createFormattingFunction(options)(obj);
}

export { IStringifyOptions };
