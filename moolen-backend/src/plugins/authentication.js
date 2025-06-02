'use strict';

const Boom = require('@hapi/boom');

const authenticationPlugin = {
    name: 'authentication',
    version: '1.0.0',
    register: async function (server, options) {
        const scheme = () => {
            return {
                authenticate: async function (request, h) {
                    const authorizationHeader = request.headers.authorization;
                    if (!authorizationHeader) {
                        return Boom.unauthorized('Missing authentication token', 'FirebaseToken');
                    }

                    const tokenParts = authorizationHeader.split(' ');
                    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
                        return Boom.unauthorized('Invalid token format', 'FirebaseToken');
                    }

                    const token = tokenParts[1];
                    const firebaseAuth = request.server.app.firebaseAuth;

                    try {
                        const decodedToken = await firebaseAuth.verifyIdToken(token);
                        return h.authenticated({
                            credentials: {
                                uid: decodedToken.uid,
                                email: decodedToken.email
                            }
                        });
                    } catch (err) {
                        console.error('Token verification error:', err);
                        return Boom.unauthorized('Invalid authentication token', 'FirebaseToken');
                    }
                }
            };
        };

        server.auth.scheme('firebaseTokenScheme', scheme);
        server.auth.strategy('firebaseToken', 'firebaseTokenScheme');
    }
};

module.exports = authenticationPlugin;