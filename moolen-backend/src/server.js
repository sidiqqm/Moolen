// server.js
'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');
const tipsRoutes = require('./routes/tipsRoutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3001,
    host: 'localhost',
    routes: {
      cors: { 
        origin: ['http://localhost:5173', 'http://localhost:3000'], // Ganti dengan URL frontend Anda jika berbeda
        credentials: true
      }
    }
  });
  server.route(tipsRoutes);


  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();