import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { ID } from "src/core/base/id.type";
import { UserItem } from "src/core/users/user.dto";

export type UserDto = Omit<UserItem, 'passwordHash'>;

export class JwtPayload {
    email: string;
    sub: number;
}

export class SignUpRequest {
    @IsEmail()
    @ApiProperty({ description: 'User email', example: 'Jqk6j@example.com', format: 'email' })
    email: string;

    @IsStrongPassword({ minLength: 8 })
    @ApiProperty({ description: 'User password', example: '12345678', minLength: 8 })
    password: string;
}

export class SignInResponse {
    @Expose()
    @ApiProperty({ description: 'User ID', example: 1 })
    userId: ID;

    @Expose()
    @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0QGV4YW1wbGUuY29tIiwic3ViIjo4LCJpYXQiOjE3MjQ4MDc3MTQsImV4cCI6MTcyNDg5NDExNH0.mKmw_SQWngBvr6StRL8yTipuFcuPFa1BqD1S4pdIcxQ' })
    accessToken: string;

    constructor(userId: ID, accessToken: string) {
        this.userId = userId;
        this.accessToken = accessToken;
    }
}