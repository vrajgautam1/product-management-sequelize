const Joi = require("joi");

const SignupSchema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const SigninSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

module.exports = {SigninSchema, SignupSchema}