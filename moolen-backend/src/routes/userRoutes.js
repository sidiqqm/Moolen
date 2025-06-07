const { getProfile } = require('../handlers/userHandler');

const userRoutes = [
    {
        method: 'GET',
        path: '/api/users/profile',
        handler: getProfile,
        options: {
            auth: 'jwt' 
        }
    },
];

module.exports = userRoutes;