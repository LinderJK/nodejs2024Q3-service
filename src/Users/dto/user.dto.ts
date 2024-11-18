import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}

export class UserResponseDto {
  id: string;
  login: string;
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
