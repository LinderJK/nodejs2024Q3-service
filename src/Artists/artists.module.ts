import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksModule } from '../Tracks/tracks.module';
import { AlbumsModule } from '../Albums/albums.module';
import { FavoritesModule } from '../Favorites/favorites.module';

@Module({
  imports: [
    TracksModule,
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
