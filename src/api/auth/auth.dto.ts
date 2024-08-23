import { IsEmail, Length } from "class-validator";
import { UserItem } from "src/core/users/user.dto";

export type UserDto = Omit<UserItem, 'passwordHash'>;

export class JwtPayload {
    email: string;
    sub: number;
}

export class SignUpRequest {
    @IsEmail()
    email: string;
    @Length(8)
    password: string;
}

export class SignInResponse {
    accessToken: string;
}