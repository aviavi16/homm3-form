import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname (כי אנחנו ב-ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files (frontend dist)
app.use(express.static(path.join(__dirname, 'dist')));

// API route
app.post('/submit', (req, res) => {
  const { creature, castle, hero, phone } = req.body;

  if (!creature || !castle || !hero || !phone) {
    logger.warn('Invalid submission attempt: Missing fields');
    return res.status(400).json({ message: 'Missing fields' });
  }

  logger.info(`Form submitted: Creature=${creature}, Castle=${castle}, Hero=${hero}, Phone=${phone}`);
  res.status(200).json({ message: 'Form submitted successfully' });
});

// Catch-all to serve index.html (for SPA routing)
app.get('*', (req, res) => {
  logger.info(`Serving frontend for path: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
