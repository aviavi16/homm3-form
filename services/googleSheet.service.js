import { google } from 'googleapis';
import logger from './logger.js'; // מניח שיש לך את הלוגger שכבר בנית

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

logger.info('Initializing Google Sheets service...');

let credentials;
try {
  credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  logger.info('✅ Credentials parsed successfully');
} catch (err) {
  logger.error('❌ Failed to parse GOOGLE_CREDENTIALS:', err);
  throw err; // לעצור כאן אם יש בעיה
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function appendToSheet(rowData) {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  
  if (!spreadsheetId) {
    logger.error('❌ Missing SPREADSHEET_ID environment variable');
    throw new Error('Missing SPREADSHEET_ID');
  }

  logger.info('Preparing to append data to Google Sheet', { spreadsheetId, rowData });

  const request = {
    spreadsheetId,
    range: "'WhatsApp Requests'!A1", // אתה יכול לשנות טווח אם צריך
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [Object.values(rowData)],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    logger.info('✅ Data appended successfully', { updatedRange: response.data.updates.updatedRange });
    return response;
  } catch (err) {
    logger.error('❌ Failed to write to Google Sheet:', err);
    throw err;
  }
}
