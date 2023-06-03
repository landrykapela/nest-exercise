import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('signin')
  async signIn(@Req() _req: Request, @Res() _res: Response) {
    const ip = _req.headers['x-forwarded-for'] || _req.socket.remoteAddress;
    console.log(
      '🚀 ~ file: auth.controller.ts:30 ~ AuthController ~ signIn ~ ip:',
      ip,
    );

    const loginAuthDto: LoginAuthDto = {
      email: _req.body.email,
      password: _req.body.password,
      loginIp: Array.isArray(ip) ? ip[0] : ip,
      loginTime: new Date(),
    };
    const response = await this.authService.signIn(loginAuthDto);

    return _res.status(response.status).send(response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
