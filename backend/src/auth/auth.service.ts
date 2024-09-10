import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(params: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findUserByEmail(params.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await bcrypt.compare(
      params.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  public async validateToken(token: string): Promise<User> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: 'testSecret',
    });

    return this.userService.findUserByEmail(payload.email);
  }
}
