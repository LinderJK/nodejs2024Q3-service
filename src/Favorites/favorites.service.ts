import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async getFavorites() {
    const favorite = await this.prisma.favorite.findFirst({
      include: {
        artists: {
          include: {
            artist: true,
          },
        },
        albums: {
          include: {
            album: true,
          },
        },
        tracks: {
          include: {
            track: true,
          },
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('No favorites found');
    }

    return {
      artists: favorite.artists.map((artistFavorite) => artistFavorite.artist),
      albums: favorite.albums.map((albumFavorite) => albumFavorite.album),
      tracks: favorite.tracks.map((trackFavorite) => trackFavorite.track),
    };
  }

  async removeTrackFromFavorites(trackId: string): Promise<void> {
    await this.validateTrackExists(trackId);

    const favoriteId = await this.getFavoriteId();

    const trackFavorite = await this.prisma.trackFavorite.findFirst({
      where: {
        trackId: trackId,
        favoriteId: favoriteId,
      },
    });

    if (!trackFavorite) {
      throw new NotFoundException('Track not found in favorites');
    }

    await this.prisma.trackFavorite.delete({
      where: {
        id: trackFavorite.id,
      },
    });
  }

  async addTrackToFavorites(trackId: string) {
    await this.validateTrackExists(trackId);
    const favoriteId = await this.getFavoriteId();

    await this.prisma.trackFavorite.create({
      data: {
        trackId,
        favoriteId,
      },
    });
  }

  async addAlbumToFavorites(albumId: string) {
    await this.validateAlbumExists(albumId);
    const favoriteId = await this.getFavoriteId();

    await this.prisma.albumFavorite.create({
      data: {
        albumId,
        favoriteId,
      },
    });
  }

  async removeAlbumFromFavorites(albumId: string): Promise<void> {
    await this.validateAlbumExists(albumId);

    const favoriteId = await this.getFavoriteId();

    const albumFavorite = await this.prisma.albumFavorite.findFirst({
      where: {
        albumId: albumId,
        favoriteId: favoriteId,
      },
    });

    if (!albumFavorite) {
      throw new NotFoundException('Album not found in favorites');
    }

    await this.prisma.albumFavorite.delete({
      where: {
        id: albumFavorite.id,
      },
    });
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    await this.validateArtistExists(artistId);
    const favoriteId = await this.getFavoriteId();

    await this.prisma.artistFavorite.create({
      data: {
        artistId,
        favoriteId,
      },
    });
  }

  async removeArtistFromFavorites(artistId: string): Promise<void> {
    await this.validateArtistExists(artistId);

    const favoriteId = await this.getFavoriteId();

    const artistFavorite = await this.prisma.artistFavorite.findFirst({
      where: {
        artistId: artistId,
        favoriteId: favoriteId,
      },
    });

    if (!artistFavorite) {
      throw new NotFoundException('Artist not found in favorites');
    }

    await this.prisma.artistFavorite.delete({
      where: {
        id: artistFavorite.id,
      },
    });
  }

  private async validateArtistExists(artistId: string) {
    const exists = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!exists) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  private async validateAlbumExists(albumId: string) {
    const exists = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!exists) {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  private async validateTrackExists(trackId: string) {
    const exists = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!exists) {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }

  private async getFavoriteId(): Promise<string> {
    let favorite = await this.prisma.favorite.findFirst();

    if (!favorite) {
      favorite = await this.prisma.favorite.create({
        data: {},
      });
    }

    return favorite.id;
  }
}
