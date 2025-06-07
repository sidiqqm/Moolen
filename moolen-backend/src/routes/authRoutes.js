
const { registerUser, loginUser, googleLogin } = require('../handlers/authHandler');

const authRoutes = [
    {
        method: 'POST',
        path: '/api/auth/register',
        handler: registerUser,
        options: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/auth/login',
        handler: loginUser,
        options: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/auth/google-login',
        handler: googleLogin,
        options: {
            auth: false 
        }
    }
];

module.exports = authRoutes;
