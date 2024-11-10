import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  duration: number;
}
