import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  // use(req: Request, res: Response, next: NextFunction) {
  //   this.logger.log(`Logging HTTP request ${req.method} ${req.url} ${res.statusCode}`,);
  //   next();
  // }
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.debug(
        `${method} ${originalUrl} ${statusCode} ${contentLength ?? 0} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}