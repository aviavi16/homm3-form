// // server.js
// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import logger from './services/logger.js';
// import { appendToSheet } from './services/googleSheet.service.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors());
// app.use(express.json());

// app.use(express.static(path.join(__dirname, 'dist')));

// app.post('/submit', async (req, res) => {
//   logger.info('Data received:', req.body);
//   try {
//     await appendToSheet(req.body);
//     res.status(200).json({ message: 'Form submitted successfully' });
//   } catch (err) {
//     logger.error('Error submitting to Google Sheets:', err);
//     res.status(500).json({ message: 'Failed to submit form' });
//   }
// });

// app.use(express.static(path.join(__dirname, 'dist')));

// // catch-all to serve index.html for SPA routing
// app.get('*', (req, res) => {
//   const requestedFile = path.join(__dirname, 'dist', req.originalUrl);
//   res.sendFile(requestedFile, (err) => {
//     if (err) {
//       logger.info('Fallback to index.html due to missing file:', req.originalUrl);
//       res.sendFile(path.join(__dirname, 'dist', 'index.html'));
//     } else {
//       logger.info('Serving static file:', req.originalUrl);
//     }
//   });
// });

// app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });\

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});