import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class PostRestroomReqDto {
  @IsInt()
  floor: number;

  @IsString()
  location: string;

  @IsBoolean()
  isMale: boolean;

  @IsInt()
  rating: number;

  @IsInt()
  congestion: number;

  @IsBoolean()
  vanity: boolean;

  @IsBoolean()
  bidet: boolean;

  @IsBoolean()
  disabled: boolean;

  @IsString()
  @IsOptional()
  extra?: string;

  @IsInt()
  buildingId: number;
}
