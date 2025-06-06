const db = require('../config/database');
const Boom = require('@hapi/boom');

const getProfile = async (request, h) => {
    // Ambil ID dari token yang sudah divalidasi oleh strategi JWT
    const { id } = request.auth.credentials;

    try {
        const [users] = await db.query('SELECT id, username, email, avatar_url FROM users WHERE id = ?', [id]);
        if (users.length === 0) {
            return Boom.notFound('User not found');
        }
        return h.response(users[0]).code(200);
    } catch (err) {
        console.error(err);
        return Boom.internal();
    }
};

// Tambahkan fungsi updateProfile di sini nanti...

module.exports = { getProfile };