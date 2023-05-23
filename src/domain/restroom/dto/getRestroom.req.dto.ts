import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetRestroomReqDto {
  @IsOptional()
  @Transform((value) => {
    return value ? +value.value : undefined;
  })
  buildingId?: number;
}
