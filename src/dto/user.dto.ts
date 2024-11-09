import { IsString, MinLength } from 'class-validator';

export interface UserDto {
  login: string;
  password: string;
}

export interface PasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
