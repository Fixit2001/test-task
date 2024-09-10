import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1] ?? '';

    if (token) {
      try {
        const user = await this.authService.validateToken(token);

        if (user) {
          req['user'] = user;
        }
      } catch (err) {
        console.log(err);
      }
    }

    next();
  }
}
