
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const dbPool = require('../config/database');

const csvFilePath = path.join(__dirname, 'health_tips.csv');
const tips = [];

const importData = async () => {
  try {

    fs.createReadStream(csvFilePath)
      .pipe(csv({
        mapHeaders: ({ header, index }) => {
          if (header.trim().toLowerCase() === 'judul artikel') return 'title';
          if (header.trim().toLowerCase() === 'isi artikel') return 'content';
          if (header.trim().toLowerCase() === 'gambar') return 'image_url';
          if (header.trim().toLowerCase() === 'sumber') return 'source_text';
          if (header.trim().toLowerCase() === 'id') return null;
          return header.trim().toLowerCase(); 
        }
      }))
      .on('data', (row) => {
        tips.push({
          title: row.title,
          content: row.content,
          image_url: row.image_url || null,
          source_text: row.source_text || null,
          category: row.category || null, 
        });
      })
      .on('end', async () => {
        console.log('CSV file successfully processed. Importing to database...');
        let importedCount = 0;
        for (const tip of tips) {
          if (tip.title && tip.content) { 
            try {
              await dbPool.query(
                'INSERT INTO daily_tips (title, content, image_url, source_text, category) VALUES (?, ?, ?, ?, ?)',
                [tip.title, tip.content, tip.image_url, tip.source_text, tip.category]
              );
              importedCount++;
            } catch (insertError) {
              console.error(`Error inserting tip "${tip.title}":`, insertError.message);
            }
          } else {
            console.warn('Skipping row due to missing title or content:', tip);
          }
        }
        console.log(`${importedCount} tips have been successfully imported.`);
        console.log(`${tips.length - importedCount} tips were skipped.`);
        await dbPool.end();
        console.log('Database connection pool closed.');
      })
      .on('error', (error) => {
        console.error('Error processing CSV file:', error);
        dbPool.end();
      });
  } catch (error) {
    console.error('Failed to import tips:', error);
    if (dbPool && dbPool.end) { 
        await dbPool.end();
    }
  }
};

importData();