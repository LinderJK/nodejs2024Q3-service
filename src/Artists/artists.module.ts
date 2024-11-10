import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from '../Tracks/tracks.module';
import { AlbumsModule } from '../Albums/albums.module';

@Module({
  imports: [TracksModule, AlbumsModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
