import { Expose } from "class-transformer";
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
    @Expose()
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}