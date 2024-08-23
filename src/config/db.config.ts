import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DbConfig {
    public readonly DB_HOST: string;
    public readonly DB_PORT: number;
    public readonly DB_USERNAME: string;
    public readonly DB_PASSWORD: string;
    public readonly DB_NAME: string;

    constructor(configService: ConfigService) {
        this.DB_HOST = configService.get('DB_HOST', 'localhost');
        this.DB_PORT = configService.get('DB_PORT', 3306);
        this.DB_USERNAME = configService.get('DB_USERNAME', 'trello');
        this.DB_PASSWORD = configService.get('DB_PASSWORD', 'trello');
        this.DB_NAME = configService.get('DB_NAME', 'trello');
    }
}

