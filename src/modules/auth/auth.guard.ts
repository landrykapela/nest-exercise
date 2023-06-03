import { CanActivate, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  validateRequest(request: Request): boolean {
    const headers = request.headers;
    const token = Object.keys(headers).includes('authorization')
      ? headers.authorization.replace('Bearer ', '')
      : null;

    console.log(
      '🚀 ~ file: auth.guard.ts:14 ~ AuthGuard ~ validateRequest ~ token:',
      token,
    );
    try {
      const decodedToken = verify(token, process.env.JWT_SECRET);
      if (decodedToken) {
        return true;
      } else return false;
    } catch (e) {
      console.log(
        '🚀 ~ file: auth.guard.ts:24 ~ AuthGuard ~ validateRequest ~ e:',
        e,
      );

      return false;
    }
  }
}
