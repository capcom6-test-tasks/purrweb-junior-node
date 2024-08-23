import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtConfig {
    public readonly JWT_SECRET: string;
    public readonly JWT_EXPIRES_IN: string;

    constructor(configService: ConfigService) {
        this.JWT_SECRET = configService.get('JWT_SECRET', 'secret');
        this.JWT_EXPIRES_IN = configService.get('JWT_EXPIRES_IN', '1d');
    }
}
