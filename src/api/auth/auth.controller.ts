import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { UserItem } from 'src/core/users/user.dto';
import { SignInResponse, SignUpRequest } from './auth.dto';
import { User } from './decorators/user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('signup')
    async signUp(@Body() body: SignUpRequest): Promise<SignInResponse> {
        const user = await this.authService.signUp(body.email, body.password);

        return new SignInResponse(
            user.id,
            await this.authService.makeJwtToken(user)
        );
    }

    @Post('signin')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async login(@User() user: UserItem): Promise<SignInResponse> {
        return new SignInResponse(
            user.id,
            await this.authService.makeJwtToken(user)
        );
    }
}
