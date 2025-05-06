import { Injectable, LoggerService as INestLogger } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import chalk from 'chalk';

@Injectable()
export class LoggerService implements INestLogger {
  private readonly logger: Logger;

  public constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ level, message, context, timestamp }) => {
          let tag: string;
          let color: (msg: string) => string;

          switch (level) {
            case 'error':
              tag = chalk.redBright('[ERROR]');
              color = chalk.redBright.bold;

              break;

            case 'warn':
              tag = chalk.yellowBright('[WARN]');
              color = chalk.yellowBright.bold;

              break;

            case 'info':
              tag = chalk.greenBright('[LOG]');
              color = chalk.greenBright.bold;

              break;

            case 'debug':
              tag = chalk.cyanBright('[DEBUG]');
              color = chalk.cyanBright.bold;

              break;

            default:
              tag = chalk.whiteBright(`[${level.toUpperCase()}]`);
              color = chalk.whiteBright.bold;
          }

          const time = chalk.gray(`[${timestamp}]`);
          const ctx = context ? chalk.magenta(`[${context}]`) : '';

          return `${time} ${tag} ${ctx} ${color(message as string)}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  public log(message: any, context?: string): void {
    this.logger.info(message, { context });
  }

  public error(message: any, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }

  public warn(message: any, context?: string): void {
    this.logger.warn(message, { context });
  }

  public debug?(message: any, context?: string): void {
    this.logger.debug?.(message, { context });
  }

  public verbose?(message: any, context?: string): void {
    this.logger.verbose?.(message, { context });
  }
}
