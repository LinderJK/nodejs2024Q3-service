import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TracksService } from '../Tracks/tracks.service';
import { AlbumsService } from '../Albums/albums.service';
import { ArtistsService } from '../Artists/artists.service';
import { FavoritesResponse } from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  private favoriteTracks: string[] = [];
  private favoriteAlbums: string[] = [];
  private favoriteArtists: string[] = [];

  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  getFavorites(): FavoritesResponse {
    try {
      const tracks = this.favoriteTracks.map((trackId) =>
        this.tracksService.findById(trackId),
      );
      const albums = this.favoriteAlbums.map((albumId) =>
        this.albumsService.getAlbumById(albumId),
      );
      const artists = this.favoriteArtists.map((artistId) =>
        this.artistsService.findById(artistId),
      );
      return {
        tracks: tracks,
        albums: albums,
        artists: artists,
      };
    } catch (error) {
      throw new NotFoundException('Favorites not found');
    }
  }
  addTrackToFavorites(trackId: string): void {
    if (this.favoriteTracks.some((track) => track === trackId)) {
      throw new BadRequestException('Track is already in favorites');
    }
    this.favoriteTracks.push(trackId);
  }

  removeTrackFromFavorites(trackId: string): void {
    const trackIndex = this.favoriteTracks.findIndex(
      (track) => track === trackId,
    );
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favoriteTracks.splice(trackIndex, 1);
  }

  addAlbumToFavorites(albumId: string): void {
    if (this.favoriteAlbums.some((album) => album === albumId)) {
      throw new BadRequestException('Album is already in favorites');
    }
    this.favoriteAlbums.push(albumId);
  }

  removeAlbumFromFavorites(albumId: string): void {
    const albumIndex = this.favoriteAlbums.findIndex(
      (album) => album === albumId,
    );
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found in favorites');
    }
    this.favoriteAlbums.splice(albumIndex, 1);
  }

  addArtistToFavorites(artistId: string): void {
    if (this.favoriteArtists.some((artist) => artist === artistId)) {
      throw new BadRequestException('Artist is already in favorites');
    }
    this.favoriteArtists.push(artistId);
  }

  removeArtistFromFavorites(artistId: string): void {
    const artistIndex = this.favoriteArtists.findIndex(
      (artist) => artist === artistId,
    );
    if (artistIndex === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }
    this.favoriteArtists.splice(artistIndex, 1);
  }
}
