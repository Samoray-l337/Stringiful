/* eslint-disable no-redeclare */
import { inspect } from 'util';
import config from './config';
import { getFormattedErrorObject } from './formatter';
import { IStringifyOptions } from './interfaces';

type stringifyFunction = (obj: any) => string;

export function stringify(obj: Object, options?: IStringifyOptions) {
    const formattedObject = getFormattedErrorObject(obj);

    return inspect(formattedObject, options ?? config.stringifyDefaultOptions);
}

export const createStringifyFunction = (options: IStringifyOptions): stringifyFunction => {
    return (obj: any) => {
        const formattedObject = getFormattedErrorObject(obj);

        return inspect(formattedObject, options);
    };
};
