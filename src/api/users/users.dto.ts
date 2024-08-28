import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsStrongPassword } from "class-validator";
import { ID } from "src/core/base/id.type";

export class User {
    @Expose()
    @ApiProperty({ description: 'User ID', example: 1 })
    id: ID;

    @Expose()
    @ApiProperty({ description: 'User name', example: 'User name' })
    email: string;

    @Expose()
    @ApiProperty({ description: 'User creation date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    createdAt: Date;

    @Expose()
    @ApiProperty({ description: 'User update date', format: 'date-time', example: '2024-01-01T00:00:00.000Z' })
    updatedAt: Date;

    constructor(source: User) {
        Object.assign(this, source);
    }
}

export class PostUser {
    @IsEmail()
    @ApiProperty({ description: 'User email', example: 'Jqk6j@example.com', format: 'email' })
    email: string;

    @IsStrongPassword({ minLength: 8 })
    @ApiProperty({ description: 'User password', example: '12345678', minLength: 8 })
    password: string;
}