import { IsString } from 'class-validator';

export class CreateFavoritesDto {
  @IsString({ each: true })
  artists: string[];
  @IsString({ each: true })
  albums: string[];
  @IsString({ each: true })
  tracks: string[];
}
