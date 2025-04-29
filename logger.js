import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // אפשר לשנות ל-debug אם רוצים יותר פירוט
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    // בעתיד: new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;
