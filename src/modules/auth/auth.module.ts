import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRepository } from '../user/repositories/user.repository';

@Module({
  imports: [UserModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, UserRepository],
})
export class AuthModule {}
