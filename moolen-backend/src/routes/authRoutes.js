'use strict';

const { registerHandler, loginHandler, googleLoginHandler } = require('../handlers/authHandler');
const { registerPayloadSchema, loginPayloadSchema, googleLoginPayloadSchema } = require('../models/userSchema');

const authRoutes = [
    {
        method: 'POST',
        path: '/auth/register',
        handler: registerHandler,
        options: {
            description: 'Register a new user',
            tags: ['api', 'auth'],
            validate: {
                payload: registerPayloadSchema
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/auth/login',
        handler: loginHandler,
        options: {
            description: 'Login a user with Firebase ID Token',
            tags: ['api', 'auth'],
            validate: {
                payload: loginPayloadSchema
            },
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/auth/google-signin',
        handler: googleLoginHandler,
        options: {
            description: 'Sign in a user with Google ID Token',
            tags: ['api', 'auth'],
            validate: {
                payload: googleLoginPayloadSchema
            },
            auth: false
        }
    }
];

module.exports = authRoutes;