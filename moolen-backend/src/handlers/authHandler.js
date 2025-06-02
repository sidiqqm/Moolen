'use strict';

const Boom = require('@hapi/boom');

const registerHandler = async (request, h) => {
    const { email, password, firstName } = request.payload;
    const firebaseAuth = request.server.app.firebaseAuth;
    const firestore = request.server.app.firestore;

    try {
        const userRecord = await firebaseAuth.createUser({
            email: email,
            password: password,
            displayName: firstName
        });

        await firestore.collection('users').doc(userRecord.uid).set({
            email: email,
            firstName: firstName,
            createdAt: new Date().toISOString()
        });

        return h.response({ message: 'Registrasi berhasil!', userId: userRecord.uid }).code(201);

    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 'auth/email-already-exists') {
            return Boom.conflict('Email sudah terdaftar.'); //
        }
        return Boom.badImplementation('Gagal melakukan registrasi.');
    }
};

const loginHandler = async (request, h) => {
    const { idToken } = request.payload; 
    const firebaseAuth = request.server.app.firebaseAuth;
    const firestore = request.server.app.firestore;

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const userDoc = await firestore.collection('users').doc(uid).get();
        if (!userDoc.exists) {
            console.warn(`User profile not found in Firestore for UID: ${uid}. Consider creating it.`);
             return h.response({
                uid: uid,
                email: decodedToken.email,
                message: 'Login berhasil! Profil akan dibuat/dicek.'
            }).code(200);
        }

        const userData = userDoc.data();
        return h.response({
            uid: uid,
            email: userData.email,
            firstName: userData.firstName,
            message: 'Login berhasil!' //
        }).code(200);

    } catch (error) {
        console.error('Login error:', error);
        return Boom.unauthorized('Login gagal: Token tidak valid atau email/password salah.'); //
    }
};

const googleLoginHandler = async (request, h) => {
    const { googleIdToken } = request.payload;
    const firebaseAuth = request.server.app.firebaseAuth;
    const firestore = request.server.app.firestore;

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(googleIdToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email;
        const name = decodedToken.name || email.split('@')[0]; 

        const userDocRef = firestore.collection('users').doc(uid);
        const userDoc = await userDocRef.get();

        let userData;
        if (!userDoc.exists) {
            userData = {
                email: email,
                firstName: name,
                createdAt: new Date().toISOString()
            };
            await userDocRef.set(userData);
            console.log(`New user profile created for UID: ${uid} via Google Sign-In`);
        } else {
            userData = userDoc.data();
        }
        
        return h.response({
            uid: uid,
            email: userData.email,
            firstName: userData.firstName,
            message: 'Login dengan Google berhasil!' //
        }).code(200);

    } catch (error) {
        console.error('Google login error:', error);
        return Boom.unauthorized('Login Google gagal. Silakan coba lagi.'); //
    }
};


module.exports = {
    registerHandler,
    loginHandler,
    googleLoginHandler
};