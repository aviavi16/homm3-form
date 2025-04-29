// services/googleSheet.service.js
import { google } from 'googleapis';
import logger from './logger.js';

export async function appendToSheet(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    console.log('spreadsheetId:', spreadsheetId)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            data.creature,
            data.castle,
            data.hero,
            data.phone,
          ],
        ],
      },
    });

    logger.info('✅ Data successfully appended to Google Sheet');
  } catch (error) {
    logger.error('❌ Failed to write to Google Sheet:', error);
    throw error;
  }
}
