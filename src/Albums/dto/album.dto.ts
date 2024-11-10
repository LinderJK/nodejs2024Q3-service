import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
