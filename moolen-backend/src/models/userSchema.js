const Joi = require('joi');

const registerPayloadSchema = Joi.object({
    email: Joi.string().email().required().description('User email address'),
    password: Joi.string().min(8).required().description('User password (min 8 characters)'),
    firstName: Joi.string().required().description('User first name')
});

const loginPayloadSchema = Joi.object({
    idToken: Joi.string().required().description('Firebase ID Token from client')
});

const googleLoginPayloadSchema = Joi.object({
    googleIdToken: Joi.string().required().description('Google ID Token from client')
});


module.exports = {
    registerPayloadSchema,
    loginPayloadSchema,
    googleLoginPayloadSchema
};