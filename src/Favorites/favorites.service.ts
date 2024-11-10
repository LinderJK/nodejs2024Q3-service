import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { TracksService } from '../Tracks/tracks.service';
import { AlbumsService } from '../Albums/albums.service';
import { ArtistsService } from '../Artists/artists.service';
import { FavoritesResponse } from './interfaces/favorites.interface';
import { Track } from '../Tracks/interfaces/track.interface';
import { Album } from '../Albums/interfaces/album.interface';
import { Artist } from '../Artists/interfaces/artist.interface';

@Injectable()
export class FavoritesService {
  private favoriteTracks: string[] = [];
  private favoriteAlbums: string[] = [];
  private favoriteArtists: string[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  getFavorites() {
    const artists = this.favoriteArtists.map((artistId) =>
      this.artistsService.findAll().find((artist) => artist.id === artistId),
    );
    const tracks = this.favoriteTracks.map((trackId) =>
      this.tracksService.findAll().find((track) => track.id === trackId),
    );
    const albums = this.favoriteAlbums.map((albumId) =>
      this.albumService.getAlbums().find((album) => album.id === albumId),
    );

    return {
      artists: artists,
      tracks: tracks,
      albums: albums,
    };
  }
  addTrackToFavorites(trackId: string): Track {
    const track = this.tracksService
      .findAll()
      .find((track) => track.id === trackId);
    // if (this.favoriteTracks.some((trackId) => track.id === trackId)) {
    //   throw new BadRequestException('Track is already in favorites');
    // }
    if (!track) {
      throw new UnprocessableEntityException('Artist not found');
    }
    this.favoriteTracks.push(track.id);
    return track;
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

  addAlbumToFavorites(albumId: string): Album {
    const album = this.albumService
      .getAlbums()
      .find((album) => album.id === albumId);
    // if (this.favoriteAlbums.some((albumId) => album.id === albumId)) {
    //   throw new BadRequestException('Album is already in favorites');
    // }
    if (!album) {
      throw new UnprocessableEntityException('Artist not found');
    }
    this.favoriteAlbums.push(albumId);

    return album;
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

  addArtistToFavorites(artistId: string): Artist {
    const artist = this.artistsService
      .findAll()
      .find((artist) => artist.id === artistId);
    // if (this.favoriteArtists.some((artistId) => artist.id === artistId)) {
    //   throw new BadRequestException('Artist is already in favorites');
    // }
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    this.favoriteArtists.push(artistId);

    return artist;
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
