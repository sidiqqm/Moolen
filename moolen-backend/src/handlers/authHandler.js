const db = require('../config/database');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Boom = require('@hapi/boom');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const registerUser = async (request, h) => {
    const { username, email, password } = request.payload;

    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ username, email, password });
    if (error) {
        return Boom.badRequest(error.details[0].message);
    }

    try {
        const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return Boom.conflict('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const id = nanoid(16);
        await db.query(
            'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)',
            [id, username, email, hashedPassword]
        );

        return h.response({ message: 'User registered successfully' }).code(201);
    } catch (err) {
        console.error(err);
        return Boom.internal('An internal server error occurred');
    }
};

const loginUser = async (request, h) => {
    const { email, password } = request.payload;

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    const { error } = schema.validate({ email, password });
    if (error) {
        return Boom.badRequest(error.details[0].message);
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return Boom.unauthorized('Invalid email or password');
        }
        const user = users[0];

        if (!user.password) {
             return Boom.unauthorized('Please log in with your Google account.');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return Boom.unauthorized('Invalid email or password');
        }

        const tokenPayload = { id: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

        return h.response({ 
            message: 'Login successful',
            token 
        }).code(200);

    } catch (err) {
        console.error(err);
        return Boom.internal('An internal server error occurred');
    }
};

const googleLogin = async (request, h) => {
    const { token } = request.payload;

    if (!token) {
        return Boom.badRequest('Missing Google token');
    }

    try {
        const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const { id: googleId, email, name: username, picture: avatar_url } = googleResponse.data;

        const [existingUsers] = await db.query('SELECT * FROM users WHERE googleId = ?', [googleId]);

        let user = existingUsers[0];

        if (!user) {
            const newUserId = nanoid(16);
            await db.query(
                'INSERT INTO users (id, googleId, email, username, avatar_url) VALUES (?, ?, ?, ?, ?)',
                [newUserId, googleId, email, username, avatar_url]
            );
            const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [newUserId]);
            user = newUser[0];
        }

        const appTokenPayload = { id: user.id, email: user.email };
        const appToken = jwt.sign(appTokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

        return h.response({
            message: 'Google login successful',
            token: appToken,
        }).code(200);

    } catch (err) {
        console.error('Google login error:', err.response ? err.response.data : err.message);
        return Boom.unauthorized('Invalid Google token or failed to process login');
    }
};


module.exports = { registerUser, loginUser, googleLogin };
