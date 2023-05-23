import { IsString } from 'class-validator';

export class PostBuildingReqDto {
  @IsString()
  name: string;
}
