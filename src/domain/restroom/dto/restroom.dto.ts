import { RestroomEntity } from 'entity/restroom.entity';
import { BuildingDto } from 'src/domain/building/dto/building.dto';

export type Facility = 'vanity' | 'bidet' | 'disabled';

export class RestroomDto {
  id: number;
  alias?: string;
  floor: number;
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
  facilities: Facility[];

  constructor(restroomEntity: RestroomEntity) {
    this.id = restroomEntity.id;
    this.alias = restroomEntity.alias;
    this.floor = restroomEntity.floor;
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

    this.facilities = [];
    if (this.vanity) this.facilities.push('vanity');
    if (this.bidet) this.facilities.push('bidet');
    if (this.disabled) this.facilities.push('disabled');
  }
}
