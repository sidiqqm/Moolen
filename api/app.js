const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

// ✅ Izinkan semua origin atau spesifik
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // max 10MB

app.post('/api/moods', upload.single('image'), (req, res) => {
  const { createdAt, mood, confidence } = req.body;
  const image = req.file;

  if (!image || !createdAt || !mood || !confidence) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  console.log('Data mood diterima:', {
    filename: image.originalname,
    createdAt,
    mood,
    confidence,
  });

  res.json({ message: 'Data mood berhasil disimpan' });
});

app.put()

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
