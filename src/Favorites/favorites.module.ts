import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TracksModule } from '../Tracks/tracks.module';
import { AlbumsModule } from '../Albums/albums.module';
import { ArtistsModule } from '../Artists/artists.module';

@Module({
  imports: [TracksModule, AlbumsModule, ArtistsModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
