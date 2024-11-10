import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/artist.dto';
import { TracksService } from '../Tracks/tracks.service';
import { AlbumsService } from '../Albums/albums.service';
import { FavoritesService } from '../Favorites/favorites.service';

@Injectable()
export class ArtistsService {
  private readonly artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  findAll(): Artist[] {
    return this.artists;
  }

  findById(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, createArtistDto: CreateArtistDto): Artist | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    return artist;
  }

  delete(id: string): void {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.tracksService.updateArtistTracks(id);
    this.albumService.updateArtistAlbums(id);
    const favorite = this.favoritesService
      .getFavorites()
      .artists.find((artist) => artist.id === id);
    if (favorite) {
      this.favoritesService.removeArtistFromFavorites(id);
    }

    this.artists.splice(artistIndex, 1);
  }
}
