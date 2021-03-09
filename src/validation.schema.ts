/* eslint-disable no-param-reassign */
import Joi from 'joi';
import { FormatterType, FormatterTypeOptions } from './formatters/interface';

const getFormatterParamsValidation = (formatterName: FormatterType) => {
    switch (formatterName) {
        case 'axiosError':
            return Joi.object({});
        case 'date':
            return Joi.object({});
        case 'string':
            return Joi.object({});

        // TODO: think about the default case well
        default:
            return Joi.object({});
    }
};

const getParamsValidation = () => {
    return FormatterTypeOptions.map((formatterType) => {
        return Joi.when('matches', { is: formatterType, then: getFormatterParamsValidation(formatterType) });
    });
};

const formatterConfigSchema = Joi.object({
    matches: Joi.function()
        .arity(1)
        .allow(...FormatterTypeOptions)
        .required()
        .error(new Error(`Matches should be a function or one of the following strings: ${FormatterTypeOptions}`)),
    format: Joi.function().arity(1),
    fieldsWhitelist: Joi.array().items(Joi.string()),
    fieldsBlacklist: Joi.array().items(Joi.string()),
    params: getParamsValidation(),
})
    .nand('fieldsWhitelist', 'fieldsBlacklist')
    .or('');

const inspectOptionsSchema = Joi.object({
    getters: Joi.valid('get', 'set', true, false),
    showHidden: Joi.boolean(),
    depth: Joi.number().allow(null),
    colors: Joi.boolean(),
    customInspect: Joi.boolean(),
    showProxy: Joi.boolean(),
    maxArrayLength: Joi.number().allow(null),
    maxStringLength: Joi.number().allow(null),
    breakLength: Joi.number(),
    compact: Joi.number().allow(true, false),
    sorted: Joi.boolean().allow(Joi.function()),
});

export const stringifyConfigSchema = Joi.object({
    formatters: Joi.array().items(formatterConfigSchema),
    inspectOptions: inspectOptionsSchema,
});
