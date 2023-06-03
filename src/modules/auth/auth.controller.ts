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
import { IpAddress } from 'src/app.decorator';
import { PartialType } from '@nestjs/mapped-types';
import { ResponseAuthDto } from './dto/response-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('signin')
  async signIn(
    @Body() loginAuthDto: LoginAuthDto,
    @IpAddress() ip,
  ): Promise<ResponseAuthDto> {
    console.log('🚀 ~ file: auth.controller.ts:34 ~ AuthController ~ ip:', ip);

    loginAuthDto.loginIp = ip;
    loginAuthDto.loginTime = new Date();
    const response = await this.authService.signIn(loginAuthDto);
    return response;
    // return _res.status(response.status).send(response);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
