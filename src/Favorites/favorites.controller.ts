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
  async getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id', new ParseUUIDPipe()) trackId: string) {
    return this.favoritesService.addTrackToFavorites(trackId);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    trackId: string,
  ) {
    this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) albumId: string) {
    return this.favoritesService.addAlbumToFavorites(albumId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) albumId: string,
  ) {
    this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ) {
    return this.favoritesService.addArtistToFavorites(artistId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ) {
    this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
