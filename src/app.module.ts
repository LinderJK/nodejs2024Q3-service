import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/users.module';
import { ArtistsModule } from './Artists/artists.module';
import { TracksController } from './Tracks/tracks.controller';
import { TracksModule } from './Tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
