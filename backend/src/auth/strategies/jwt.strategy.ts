import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dL8oS1+WZ/pLvEYeMkmO4Z3HYQWhYZ88n2vqQfr2aFA=',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    const isTokenValid = await this.authService.validateAccessToken(payload, accessToken);
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
