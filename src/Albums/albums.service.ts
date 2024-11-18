import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}
  async getAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });

    return newAlbum;
  }

  async updateAlbum(
    id: string,
    createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return this.prisma.album.update({
      where: { id },
      data: {
        ...createAlbumDto,
      },
    });
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
    await this.prisma.album.delete({
      where: { id },
    });
  }
}
