import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { ArtistsModule } from './Artists/artists.module';
import { TracksController } from './Tracks/tracks.controller';
import { TracksModule } from './Tracks/tracks.module';
import { AlbumsModule } from './Albums/albums.module';
import { FavoritesModule } from './Favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
