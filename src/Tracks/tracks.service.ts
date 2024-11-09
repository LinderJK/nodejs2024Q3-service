import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/track.dto';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findById(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  create(track: CreateTrackDto): Track {
    const newTrack = { ...track, id: uuidv4() };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updatedTrack: CreateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    track.name = updatedTrack.name;
    track.artistId = updatedTrack.artistId;
    track.albumId = updatedTrack.albumId;
    track.duration = updatedTrack.duration;
    return track;
  }

  delete(id: string): void {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    this.tracks.splice(trackIndex, 1);
  }
  updateArtistTracks(artistId: string, newArtistId: string | null): void {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = newArtistId;
      }
    });
  }
}
