import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  public async createUser(params: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(params.password, 10);

    return this.userRepository.create({
      ...params,
      password: hash,
    });
  }

  public findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
