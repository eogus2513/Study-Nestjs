import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public generateToken(id: string, type: string, exp: number): string {
    return this.jwtService.sign(
      {
        sub: `${id}`,
        type,
      },
      {
        secret: process.env.ACCESS_JWT,
        algorithm: 'HS256',
        expiresIn: exp,
      },
    );
  }

  public httpVerify(token: string) {
    try {
      return this.jwtService.verify(token.split(' ')[1], {
        secret: process.env.ACCESS_JWT,
        ignoreExpiration: false,
      });
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  public wsVerify(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token.split('')[1], {
        secret: process.env.ACCESS_JWT,
        ignoreExpiration: false,
      });
    } catch (e) {
      throw new WsException(e.message);
    }
  }
}
