import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { isObject } from 'lodash';
import { LoggerService } from '@core/services/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  public constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  public async catch(exception: Error | HttpException, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const method = request.method;
    const url = request.url;

    const errorMsg = exception instanceof HttpException
      ? (isObject(exception.getResponse())
        ? (exception.getResponse() as any).message
        : exception.getResponse())
      : exception.message;

    const base = `${method} ${url} ${status} - ${typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg)}`;

    this.logger.error(
      base,
      status >= 500 && exception.stack ? exception.stack : undefined,
      'AllExceptionsFilter',
    );

    const responseBody = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (isObject(res)) {
        responseBody.message = (res as any).message ?? 'Internal server error';

        if ((res as any).fields) {
          (responseBody as any).fields = (res as any).fields;
        }
      } else {
        responseBody.message = res as string;
      }
    } else {
      responseBody.message = exception.message;
    }

    httpAdapter.reply(response, responseBody, status);
  }
}
