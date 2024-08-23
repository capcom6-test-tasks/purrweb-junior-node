import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserItem } from 'src/core/users/user.dto';
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {

    }

    public async signUp(email: string, password: string): Promise<UserItem> {
        const existing = await this.usersService.findByEmail(email);
        if (existing) {
            throw new ConflictException('Email already in use');
        }

        const passwordHash = await argon2.hash(password);
        const user = await this.usersService.create({ email, passwordHash });

        return user;
    }

    public async signIn(email: string, password: string): Promise<UserItem> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        const valid = await argon2.verify(user.passwordHash, password);
        if (!valid) {
            throw new UnauthorizedException();
        }

        return user;
    }

    public async makeJwtToken(user: UserItem): Promise<string> {
        return await this.jwtService.signAsync({ email: user.email, sub: user.id });
    }
}
