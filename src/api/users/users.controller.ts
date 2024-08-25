import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersService } from 'src/core/users/users.service';
import { User } from './users.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get()
    async findAll(): Promise<User[]> {
        return (await this.usersService.findAll()).map(user => new User(user));
    }

    @Get(':id')
    async findOne(id: number): Promise<User> {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return new User(user);
    }
}
