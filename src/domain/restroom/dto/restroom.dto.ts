import { RestroomEntity } from 'entity/restroom.entity';
import { BuildingDto } from 'src/domain/building/dto/building.dto';

export class RestroomDto {
  id: number;
  location: string;
  isMale: boolean;
  rating: number;
  congestion: number;
  vanity: boolean;
  bidet: boolean;
  disabled: boolean;
  extra: string;
  building?: BuildingDto;
  createdAt: string;

  constructor(restroomEntity: RestroomEntity) {
    this.location = restroomEntity.location;
    this.isMale = restroomEntity.isMale;
    this.rating = restroomEntity.rating;
    this.congestion = restroomEntity.congestion;
    this.vanity = restroomEntity.vanity;
    this.bidet = restroomEntity.bidet;
    this.disabled = restroomEntity.disabled;
    this.extra = restroomEntity.extra;
    this.createdAt = new Date(restroomEntity.createdAt).toISOString();

    if (restroomEntity.building) {
      this.building = new BuildingDto(restroomEntity.building);
    }
  }
}
