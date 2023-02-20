import Joi from "joi";

export const schema = Joi.object({
    type: Joi.string().required(),
    origin: Joi.string(),
    destination: Joi.string().disallow(Joi.ref("origin")),
    amount: Joi.number().positive().required(),
});
