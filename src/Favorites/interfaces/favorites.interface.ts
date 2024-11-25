import { Track } from '../../Tracks/interfaces/track.interface';
import { Album } from '../../Albums/interfaces/album.interface';
import { Artist } from '../../Artists/interfaces/artist.interface';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
