import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { SignInResponse, SignUpRequest } from './auth.dto';
import { AuthService } from 'src/api/auth/auth.service';
import { UserItem } from 'src/core/users/user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('signup')
    async signUp(@Body() body: SignUpRequest): Promise<SignInResponse> {
        const user = await this.authService.signUp(body.email, body.password);

        return {
            accessToken: await this.authService.makeJwtToken(user)
        };
    }

    @Post('signin')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request): Promise<SignInResponse> {
        return {
            accessToken: await this.authService.makeJwtToken(req.user as UserItem)
        };
    }
}
