//validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .pattern(new RegExp('^[a-zA-Z0-9!?@#%$&]{8,56}$'))
            .required(),
        repeat_password: Joi.ref('password')
    });

    return schema.validate(data);
}

//Register Validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false }})
            .required(),
        password: Joi.string()
            .min(8)
            .required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;