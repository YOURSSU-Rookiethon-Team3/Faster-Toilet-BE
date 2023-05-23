import { BuildingEntity } from 'entity/building.entity';
import { RestroomDto } from 'src/domain/restroom/dto/restroom.dto';

export class BuildingDto {
  id: number;
  name: string;
  restrooms?: RestroomDto[];
  createdAt: string;

  constructor(buildingEntity: BuildingEntity) {
    this.id = buildingEntity.id;
    this.name = buildingEntity.name;
    this.createdAt = new Date(buildingEntity.createdAt).toISOString();
    if (buildingEntity.restrooms) {
      this.restrooms = buildingEntity.restrooms?.map(
        (restroom) => new RestroomDto(restroom),
      );
    }
  }
}
