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
import { ArtistsService } from './artists.service';
import { Artist } from './interfaces/artist.interface';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { CreateArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }
  @Get(':id')
  async getArtistById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Artist> {
    return this.artistsService.findById(id);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.update(id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    this.artistsService.delete(id);
  }
}
