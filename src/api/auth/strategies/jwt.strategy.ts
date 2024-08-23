import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfig } from 'src/config/jwt.config';
import { UsersService } from 'src/core/users/users.service';
import { JwtPayload } from '../auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        jwtConfig: JwtConfig,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload) {
        return await this.usersService.findById(payload.sub);
    }
}