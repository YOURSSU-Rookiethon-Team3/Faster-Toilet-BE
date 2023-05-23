import { IsOptional, IsString } from 'class-validator';

export class PatchBuildingReqDto {
  @IsOptional()
  @IsString()
  name: string;
}
