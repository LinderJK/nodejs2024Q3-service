import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../Users/dto/user.dto';
import { UsersService } from '../Users/users.service';
import SaltAndHashPassword from '../utils/saltAndHashPassword';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    user: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const userFound = await this.userService.getUserByLogin(user.login);
    if (!userFound) {
      throw new ForbiddenException('User not found');
    }
    const isPasswordValid = await SaltAndHashPassword.comparePassword(
      user.password,
      userFound.password,
    );
    console.log('isPasswordValid', isPasswordValid);
    console.log(user.password, userFound.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      login: user.login,
      userId: userFound.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  async signUp(user: CreateUserDto) {
    const newUser = await this.userService.createUser({
      ...user,
    });

    console.log('NEW USER');

    return newUser;
  }

  async refreshToken(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }

      const { userId } = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      console.log(userId);

      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const payload = {
        login: user.login,
        userId: user.id,
      };

      const newAccessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });

      const newRefreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}

export default AuthService;
