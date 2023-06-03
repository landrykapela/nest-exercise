import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { UserData } from '../user/user.interface';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async create(createAuthDto: CreateAuthDto): Promise<ResponseAuthDto> {
    const createUserDto = createAuthDto as CreateUserDto;
    const createdUser = await this.userService.create(createUserDto);
    const userData: UserData = {
      email: createdUser.email,
      lastLogin: createdUser.lastLogin,
      lastLoginIp: createdUser.lastLoginIp,
      createdAt: createdUser.createdAt,
    };
    const accessToken = sign(createUserDto.password, process.env.JWT_SECRET);
    const response: ResponseAuthDto = {
      status: 201,
      message: 'User created successfully',
      data: { user: userData, accessToken: accessToken },
    };
    return response;
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOneByEmail(loginAuthDto.email);
    console.log(
      '🚀 ~ file: auth.service.ts:35 ~ AuthService ~ signIn ~ user:',
      user,
    );

    if (user) {
      try {
        const passwordCorrect = await compare(
          loginAuthDto.password,
          user.password,
        );
        console.log(
          '🚀 ~ file: auth.service.ts:45 ~ AuthService ~ signIn ~ passwordCorrect:',
          passwordCorrect,
        );

        if (passwordCorrect) {
          const userData: UserData = {
            email: user.email,
            lastLogin: new Date(),
            lastLoginIp: loginAuthDto.loginIp,
            createdAt: user.createdAt,
          };
          console.log('jwt :', process.env.JWT_SECRET);
          const accessToken = sign(loginAuthDto.email, process.env.JWT_SECRET);
          console.log(
            '🚀 ~ file: auth.service.ts:50 ~ AuthService ~ signIn ~ accessToken:',
            accessToken,
          );

          user.lastLogin = loginAuthDto.loginTime;
          user.lastLoginIp = loginAuthDto.loginIp;
          const upUser = await this.update(user.id, loginAuthDto);
          console.log(
            '🚀 ~ file: auth.service.ts:70 ~ AuthService ~ signIn ~ upUser:',
            upUser,
          );
          const response: ResponseAuthDto = {
            status: 200,
            message: 'Login successful',
            data: { user: userData, accessToken: accessToken },
          };
          return response;
        } else {
          const response: ResponseAuthDto = {
            status: 401,
            message: 'Login failed',
            error: { code: 'INCORECT PASSWORD', message: 'Incorrect password' },
          };
          return response;
        }
      } catch (ex) {
        console.log(
          '🚀 ~ file: auth.service.ts:78 ~ AuthService ~ signIn ~ ex:',
          ex,
        );
        const response: ResponseAuthDto = {
          status: 401,
          message: 'Login Failed',
          error: {
            code: 'PASSWORD ERROR',
            message: 'Could not verify password',
          },
        };
        return response;
      }
    } else {
      const response: ResponseAuthDto = {
        status: 401,
        message: 'Login failed',
        error: { code: 'INVALID USER', message: 'Invalid email address' },
      };
      return response;
    }
  }

  async update(id: number, updateAuthDto: LoginAuthDto) {
    const updatedUser = await this.userService.updateLogin(id, updateAuthDto);
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
