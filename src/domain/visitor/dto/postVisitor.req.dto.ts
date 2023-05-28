import { IsOptional, IsString } from 'class-validator';

export class PostVisitorReqDto {
  @IsString()
  @IsOptional()
  visitorToken?: string;
}
