import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { JsonResult } from 'src/utils/json.result';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const statusCode = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    // console.error(res);

    response
      .status(200)
      .json(
        JsonResult.getInstance().set(
          statusCode,
          res?.message?.join ? res.message.join(',') : exception.message,
        ),
      );
  }
}
