import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class LoginAuthDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  loginIp?: string;
  @IsOptional()
  loginTime?: Date;
}
