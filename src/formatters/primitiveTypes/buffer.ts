import _ from 'lodash';
import config from '../../config';
import { ObjectFormatter, formatFunction } from '../interface';

type bufferParams = {
    showAll?: boolean;
    showFromStart?: number;
    showFromEnd?: number;
};

interface IBufferFormatterConfig {
    matches: 'buffer';
    params?: bufferParams;
    format?: formatFunction;
}

export type BufferFormatterConfig = IBufferFormatterConfig;

export const isBuffer = (obj: any) => {
    return Buffer.isBuffer(obj);
};

export const getBufferFormatter = (formatterConfig: BufferFormatterConfig): ObjectFormatter => {
    const {
        formattersDefaultParams: {
            buffer: { showAll, showFromStart, showFromEnd },
        },
    } = config;

    const baseBufferFormatter: ObjectFormatter = {
        matches: isBuffer,
    };

    const defaultFormatFunction = (buffer: Buffer) => {
        const bufferAsArray = buffer.toJSON().data;
        let formattedBuffer = `[${bufferAsArray.toString()}]`;

        const selectedShowAll = formatterConfig.params?.showAll ?? showAll;
        const selectedShowFromStart = formatterConfig.params?.showFromStart ?? showFromStart;
        const selectedShowFromEnd = formatterConfig.params?.showFromEnd ?? showFromEnd;

        if (!selectedShowAll) {
            formattedBuffer = `[${bufferAsArray.slice(0, selectedShowFromStart)} ........ ${bufferAsArray.slice(0, selectedShowFromEnd)}]`;
        }

        return formattedBuffer;
    };

    baseBufferFormatter.format = formatterConfig.format ?? defaultFormatFunction;

    return baseBufferFormatter;
};
