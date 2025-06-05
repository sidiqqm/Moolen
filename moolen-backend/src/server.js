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
      cors: { // Konfigurasi CORS
        origin: ['http://localhost:5173', 'http://localhost:3000'], // Ganti dengan URL frontend Anda jika berbeda
        credentials: true
      }
    }
  });

  // Daftarkan rute
  server.route(tipsRoutes);

  // Plugin untuk dokumentasi (opsional, tapi sangat membantu)
  // const swaggerOptions = {
  //   info: {
  //     title: 'Moolen API Documentation',
  //     version: '1.0.0',
  //   },
  // };
  // await server.register([
  //   require('@hapi/inert'),
  //   require('@hapi/vision'),
  //   {
  //     plugin: require('hapi-swagger'),
  //     options: swaggerOptions,
  //   },
  // ]);


  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();