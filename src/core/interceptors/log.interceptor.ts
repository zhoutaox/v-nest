import {
  CallHandler,
  ExecutionContext,
  HttpServer,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import requestIp from 'request-ip';
import { Request as RequestIpRequest } from 'request-ip';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import * as iconv from 'iconv-lite';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  @Inject(HttpService)
  private httpService: HttpService;

  async ipToCity(ip: string) {
    const response: AxiosResponse<{
      addr: string;
    }> = await this.httpService.axiosRef(
      `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
      {
        responseType: 'arraybuffer',
        transformResponse: [
          function (data) {
            const str = iconv.decode(data, 'gbk');
            return JSON.parse(str);
          },
        ],
      },
    );
    return response.data.addr;
  }
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const now = Date.now();
    console.error('noew');
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // const userAgent = request.headers['user-agent'];
    // const { ip, method, path } = request;
    // const clientIp = requestIp.getClientIp(request as RequestIpRequest);

    // console.log(await this.ipToCity(clientIp as string));

    // this.logger.debug(
    //   `-clientIp:${clientIp} -${method} -${path} - ${userAgent} ${ip}:${context.getClass().name}${context.getHandler().name}`,
    // );

    return next.handle().pipe(
      tap(() => {
        console.log(
          `After...${context.getHandler().name} ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
