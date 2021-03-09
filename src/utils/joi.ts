import Joi from 'joi';

export const validationOptions: Joi.ValidationOptions = {
    abortEarly: false,
    allowUnknown: false,
    convert: true,
};

export const validateDataWithSchema = (data: any, schema: Joi.Schema, options = validationOptions) => {
    const { error, value } = schema.validate(data, options);
    if (error) {
        throw error;
    }

    return value;
};
