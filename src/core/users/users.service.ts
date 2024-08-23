import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { CreateUser, UpdateUser, UserItem } from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly dataSource: DataSource
    ) {

    }

    public async findById(id: number): Promise<UserItem | null> {
        const user = await this.dataSource
            .getRepository(User)
            .findOneBy({ id });
        return user;
    }

    public async findByEmail(email: string): Promise<UserItem | null> {
        const user = await this.dataSource
            .getRepository(User)
            .findOneBy({ email });
        return user;
    }

    public async create(data: CreateUser): Promise<UserItem> {
        const user = new User();

        user.email = data.email;
        user.passwordHash = data.passwordHash;

        return await this.dataSource
            .getRepository(User)
            .save(user);
    }

    public async update(id: number, data: UpdateUser): Promise<UserItem> {
        const user = await this.dataSource
            .getRepository(User)
            .findOneByOrFail({ id });

        data.email && (user.email = data.email);
        data.passwordHash && (user.passwordHash = data.passwordHash);

        return await this.dataSource
            .getRepository(User)
            .save(user);
    }
}