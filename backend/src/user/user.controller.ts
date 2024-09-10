import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Get('current-user')
  getCurrent(@Request() req) {
    const user: User = req.user;

    if (!user) {
      return null;
    }

    return user;
  }
}
