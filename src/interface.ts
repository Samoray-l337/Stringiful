import { InspectOptions } from 'util';
import { IFormatterConfig } from './formatters/interface';

export interface IStringifyOptions {
    formatters?: IFormatterConfig[];
    inspectOptions?: InspectOptions;
}

export type IFormatObjectOptions = Pick<IStringifyOptions, 'formatters'>;
