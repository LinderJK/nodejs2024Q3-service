import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) trackId: string) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id', new ParseUUIDPipe()) trackId: string) {
    this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) albumId: string) {
    this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) artistId: string) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ) {
    this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
