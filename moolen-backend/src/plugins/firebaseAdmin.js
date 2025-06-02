'use strict';

const admin = require('firebase-admin');

const firebaseAdminPlugin = {
    name: 'firebaseAdmin',
    version: '1.0.0',
    register: async function (server, options) {
        try {
            const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH); 

            if (admin.apps.length === 0) {
                admin.initializeApp({
                    credential: admin.credential.cert(serviceAccount)
                });
                console.log('Firebase Admin SDK initialized successfully.');
            }

            server.app.firestore = admin.firestore();
            server.app.firebaseAuth = admin.auth();

        } catch (error) {
            console.error('Error initializing Firebase Admin SDK:', error);
            throw error;
        }
    }
};

module.exports = firebaseAdminPlugin;