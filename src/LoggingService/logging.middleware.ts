import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const logMessage = `[${method}] ${url} - Query: ${JSON.stringify(
        query,
      )} - Body: ${JSON.stringify(body)} - Status: ${
        res.statusCode
      } - Duration: ${duration}ms`;
      this.loggingService.log(logMessage);
    });

    next();
  }
}
