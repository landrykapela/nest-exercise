import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { genSaltSync, hashSync } from 'bcryptjs';
import { LoginAuthDto } from '../auth/dto/login-auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    const salt = genSaltSync(12);
    user.email = createUserDto.email;
    user.password = hashSync(createUserDto.password, salt);
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
  async updateLogin(id: number, loginAuthDto: LoginAuthDto) {
    const updatedUser = await this.userRepository.findOne(id);
    if (updatedUser) {
      updatedUser.lastLogin = loginAuthDto.loginTime;
      updatedUser.lastLoginIp = loginAuthDto.loginIp;
      updatedUser.updatedAt = new Date();
      await this.userRepository.update(updatedUser);
    }
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
