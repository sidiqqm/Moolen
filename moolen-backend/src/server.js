'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');
const HapiJwt = require('@hapi/jwt'); 

const tipsRoutes = require('./routes/tipsRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000, 
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://localhost:5173'], 
                credentials: true
            }
        }
    });

    await server.register(HapiJwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 60 * 60 * 24 * 7 
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: artifacts.decoded.payload
            };
        }
    });

    server.route(tipsRoutes);
    server.route(authRoutes);
    server.route(userRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
