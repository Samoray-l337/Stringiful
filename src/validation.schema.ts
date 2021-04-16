import Joi from 'joi';
import { FormatterType, FormatterTypeOptions, IFormatterConfig } from './formatters/interface';
import { timeZoneOptions } from './formatters/primitiveTypes/date/timezones';
import config from './config';

const {
    stringifyDefaultOptions: {
        inspectOptions: { breakLength, depth },
    },
} = config;

const stringFormatterParamsSchema = Joi.object({
    maxLength: Joi.number(),
});

const axiosErrorFormatterParamsSchema = Joi.object({
    maxResponseDataLength: Joi.number(),
    maxRequestDataLength: Joi.number(),
});

const dateFormatterParamsSchema = Joi.object({
    timezone: Joi.string().valid(...timeZoneOptions),
    locale: Joi.string(),
});

const doesFormatterConfigsAreForTheSameMatch = (first: IFormatterConfig, second: IFormatterConfig) => {
    return first.matches === second.matches;
};

const getFormatterParamsValidation = (formatterName: FormatterType) => {
    switch (formatterName) {
        case 'axiosError':
            return Joi.when('matches', { is: 'axiosError', then: axiosErrorFormatterParamsSchema });
        case 'date':
            return Joi.when('matches', { is: 'date', then: dateFormatterParamsSchema });
        case 'string':
            return Joi.when('matches', { is: 'string', then: stringFormatterParamsSchema });

        // TODO: think about the default case well
        default:
            throw new Error('BUG - got unknown formatter type');
    }
};

const getParamsValidation = () => {
    const formattersSchemas = FormatterTypeOptions.map((formatterType) => {
        return getFormatterParamsValidation(formatterType);
    });

    return formattersSchemas.reduce((accumulator, currentValue) => accumulator.concat(currentValue));
};

const supportBlacklistWhitelist = ['axiosError'];

const formatterConfigSchema = Joi.object({
    matches: Joi.function()
        .arity(1)
        .allow(...FormatterTypeOptions)
        .required()
        .error(new Error(`Matches should be a function or one of the following strings: ${FormatterTypeOptions}`)),
    format: Joi.function().arity(1),
    fieldsBlacklist: Joi.when('matches', {
        is: Joi.valid(...supportBlacklistWhitelist),
        then: Joi.array().items(Joi.string()),
        otherwise: Joi.forbidden(),
    }),
    fieldsWhitelist: Joi.when('matches', {
        is: Joi.valid(...supportBlacklistWhitelist),
        then: Joi.array().items(Joi.string()),
        otherwise: Joi.forbidden(),
    }),
    params: getParamsValidation(),
})
    .nand('fieldsWhitelist', 'fieldsBlacklist')
    .nand('format', 'params')
    .or('format', 'fieldsWhitelist', 'fieldsBlacklist', 'params');

const inspectOptionsSchema = Joi.object({
    getters: Joi.valid('get', 'set', true, false),
    showHidden: Joi.boolean(),
    depth: Joi.number().allow(null).default(depth),
    colors: Joi.boolean(),
    customInspect: Joi.boolean(),
    showProxy: Joi.boolean(),
    maxArrayLength: Joi.number().allow(null),
    maxStringLength: Joi.number().allow(null),
    breakLength: Joi.number().default(breakLength),
    compact: Joi.number().allow(true, false),
    sorted: Joi.boolean().allow(Joi.function()),
});

export const stringifyConfigSchema = Joi.object({
    formatters: Joi.array().items(formatterConfigSchema).unique(doesFormatterConfigsAreForTheSameMatch),
    inspectOptions: inspectOptionsSchema,
});
