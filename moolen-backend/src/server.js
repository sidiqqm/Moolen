'use strict';

require('dotenv').config(); 
const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');

const firebaseAdminPlugin = require('./plugins/firebaseAdmin');
const authenticationPlugin = require('./plugins/authentication');
const authRoutes = require('./routes/authRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3001,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://localhost:5173'], 
                credentials: true,
            },
            validate: {
                failAction: async (request, h, err) => {
                    if (process.env.NODE_ENV === 'production') {
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        console.error(err);
                        throw err;
                    }
                }
            }
        }
    });

    await server.register(firebaseAdminPlugin);

    await server.register(authenticationPlugin);
    server.auth.default('firebaseToken'); 

    server.route(authRoutes);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return { message: 'Moolen Backend API is running!' };
        },
        options: { 
        auth: false
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();