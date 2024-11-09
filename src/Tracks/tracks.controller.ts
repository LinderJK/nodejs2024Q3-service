import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { Track } from './interfaces/track.interface';
import { ParseUUIDPipe } from '@nestjs/common/pipes/parse-uuid.pipe';
import { CreateTrackDto } from './dto/track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async getTrackById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Track> {
    return this.tracksService.findById(id);
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updatedTrack: CreateTrackDto,
  ): Promise<Track> {
    return this.tracksService.update(id, updatedTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    this.tracksService.delete(id);
  }
}
