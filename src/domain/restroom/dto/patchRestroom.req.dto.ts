import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class PatchRestroomReqDto {
  @IsInt()
  @IsOptional()
  floor: number;

  @IsString()
  @IsOptional()
  location: string;

  @IsBoolean()
  @IsOptional()
  isMale: boolean;

  @IsInt()
  @IsOptional()
  rating: number;

  @IsInt()
  @IsOptional()
  congestion: number;

  @IsBoolean()
  @IsOptional()
  vanity: boolean;

  @IsBoolean()
  @IsOptional()
  bidet: boolean;

  @IsBoolean()
  @IsOptional()
  disabled: boolean;

  @IsString()
  @IsOptional()
  extra?: string;
}
