import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/album.dto';
import { TracksService } from '../Tracks/tracks.service';
import { FavoritesService } from '../Favorites/favorites.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}
  getAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, createAlbumDto: CreateAlbumDto): Album {
    const album = this.getAlbumById(id);
    Object.assign(album, createAlbumDto);
    return album;
  }

  deleteAlbum(id: string): void {
    const index = this.albums.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    const album = this.favoritesService
      .getFavorites()
      .albums.find((a) => a.id === id);
    if (album) {
      this.favoritesService.removeAlbumFromFavorites(id);
    }
    this.tracksService.updateAlbumTracks(id);
    this.albums.splice(index, 1);
  }

  updateArtistAlbums(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
