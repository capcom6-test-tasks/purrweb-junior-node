import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserItem } from 'src/core/users/user.dto';
import { UsersService } from 'src/core/users/users.service';
import { AuthService } from '../auth/auth.service';
import { User as UserParam } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { USER_ID_PARAM } from './users.const';
import { PostUser as PostUserDto, User } from './users.dto';
import { UsersGuard } from './users.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({ type: [User] })
    async findAll(): Promise<User[]> {
        return (await this.usersService.findAll()).map(user => new User(user));
    }

    @Get(`:${USER_ID_PARAM}`)
    @UseGuards(JwtAuthGuard, UsersGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: USER_ID_PARAM, description: 'User ID' })
    @ApiOkResponse({ type: User })
    async findOne(
        @UserParam() user: UserItem
    ): Promise<User> {
        return new User(user);
    }

    @Post()
    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 201, type: PostUserDto })
    @ApiConflictResponse({ description: 'User already exists' })
    async create(@Body() body: PostUserDto): Promise<User> {
        return new User(await this.authService.signUp(body.email, body.password));
    }
}
