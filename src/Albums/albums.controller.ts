import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return this.albumsService.getAlbums();
  }

  @Get(':id')
  async getAlbumById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Album> {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.updateAlbum(id, createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    this.albumsService.deleteAlbum(id);
  }
}
