import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser, UpdateUser, UserItem } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ) {
    }

    public async findAll(): Promise<UserItem[]> {
        const users = await this.users
            .find();
        return users;
    }

    public async findById(id: number): Promise<UserItem | null> {
        const user = await this.users
            .findOneBy({ id });
        return user;
    }

    public async findByEmail(email: string): Promise<UserItem | null> {
        const user = await this.users
            .findOneBy({ email });
        return user;
    }

    public async create(data: CreateUser): Promise<UserItem> {
        const user = new User();

        user.email = data.email;
        user.passwordHash = data.passwordHash;

        return await this.users
            .save(user);
    }

    public async update(id: number, data: UpdateUser): Promise<UserItem> {
        const user = await this.users
            .findOneByOrFail({ id });

        data.email && (user.email = data.email);
        data.passwordHash && (user.passwordHash = data.passwordHash);

        return await this.users
            .save(user);
    }
}