import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findById(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  async create(track: CreateTrackDto): Promise<Track> {
    const newTrack = await this.prisma.track.create({
      data: {
        ...track,
      },
    });
    return newTrack;
  }

  async update(id: string, updatedTrack: CreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return await this.prisma.track.update({
      where: { id },
      data: {
        ...updatedTrack,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    await this.prisma.track.delete({
      where: { id },
    });
  }
}
