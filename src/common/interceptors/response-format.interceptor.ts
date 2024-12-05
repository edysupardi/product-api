import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CUSTOM_MESSAGE_KEY } from '../decorators/custom-message.decorator'; // Import decorator
import { Reflector } from '@nestjs/core';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const customMessage = this.reflector.get<string>(CUSTOM_MESSAGE_KEY, context.getHandler());

    return next.handle().pipe(
      map(data => ({
        status: 'success',
        message: customMessage || 'Ok!', // Gunakan custom message jika ada
        data,
      })),
      catchError((error: any) => {
        const response = error.getResponse();
        const status = error.getStatus();
        const message = typeof response === 'object' && 'message' in response ? response['message'] : response;

        return throwError(() => ({
          status: 'error',
          message: message,
          statusCode: status,
        }));
      }),
    );
  }

}