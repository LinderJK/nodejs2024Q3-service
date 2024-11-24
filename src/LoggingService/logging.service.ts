import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private readonly logFile: string;
  private readonly logLevel: string;

  constructor() {
    const logDir = process.env.LOG_DIR || 'logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logFile = path.join(logDir, 'application.log');
    this.logLevel = process.env.LOG_LEVEL || 'info';

    this.rotateLogs(Number(process.env.LOG_FILE_MAX_SIZE || 1024));
  }

  private writeLog(level: string, message: string) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;

      fs.appendFileSync(this.logFile, logMessage, { encoding: 'utf8' });
    }
  }

  private shouldLog(level: string): boolean {
    const levels = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private rotateLogs(maxSizeKb: number) {
    const stats = fs.existsSync(this.logFile)
      ? fs.statSync(this.logFile)
      : null;

    if (stats && stats.size / 1024 > maxSizeKb) {
      const rotatedFile = `${this.logFile}.${Date.now()}`;
      fs.renameSync(this.logFile, rotatedFile);
    }
  }

  log(message: string) {
    this.writeLog('info', message);
  }

  warn(message: string) {
    this.writeLog('warn', message);
  }

  error(message: string, trace?: string) {
    this.writeLog('error', `${message} - Trace: ${trace || 'No stack trace'}`);
  }

  debug(message: string) {
    this.writeLog('debug', message);
  }
}
