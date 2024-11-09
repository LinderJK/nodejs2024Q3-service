import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksService } from '../Tracks/tracks.service';
import { TracksModule } from '../Tracks/tracks.module';

@Module({
  imports: [TracksModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, TracksService],
})
export class ArtistsModule {}
