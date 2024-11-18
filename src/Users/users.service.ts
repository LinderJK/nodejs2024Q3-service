import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto, CreateUserDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    }));
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const timestamp = new Date();
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        createdAt: timestamp,
        updatedAt: timestamp,
        version: 1,
      },
    });
    const { password, ...userWithoutPassword } = newUser;
    return {
      ...userWithoutPassword,
      createdAt: new Date(userWithoutPassword.createdAt).getTime(),
      updatedAt: new Date(userWithoutPassword.updatedAt).getTime(),
    };
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect old password');
    }
    const timestamp: Date = new Date();
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        updatedAt: timestamp,
        version: user.version + 1,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      ...userWithoutPassword,
      createdAt: new Date(userWithoutPassword.createdAt).getTime(),
      updatedAt: new Date(userWithoutPassword.updatedAt).getTime(),
    };
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
