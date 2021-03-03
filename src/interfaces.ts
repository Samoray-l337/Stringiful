import { InspectOptions } from 'util';
import { IFormatterConfig } from './formatters/interface';

export interface IStringifyOptions {
    formatters?: IFormatterConfig[];
    inspectOptions?: InspectOptions;
}
