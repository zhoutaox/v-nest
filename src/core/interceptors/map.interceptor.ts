import { JsonResult } from '@/utils/json.result';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class MapInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (data instanceof JsonResult) {
          return data;
        }
        return { code: 200, message: 'success', data };
      }),
    );
  }
}
