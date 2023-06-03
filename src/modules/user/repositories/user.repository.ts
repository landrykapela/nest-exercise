/* eslint-disable @typescript-eslint/no-empty-function */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }
  async create(user: User) {
    const newUser = this.userRepository.create(user);
    console.log(
      '🚀 ~ file: user.repository.ts:22 ~ UserRepository ~ create ~ newUser:',
      newUser,
    );

    return await this.userRepository.save(newUser);
  }
  async update(user: User) {
    return await this.userRepository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }
}
