import { BuildingEntity } from 'entity/building.entity';
import { RestroomDto } from 'src/domain/restroom/dto/restroom.dto';

export class BuildingDto {
  id: number;
  name: string;
  restrooms?: RestroomDto[];
  floors?: number[];
  createdAt: string;
  recommendRestroom: RestroomDto;

  constructor(buildingEntity: BuildingEntity) {
    this.id = buildingEntity.id;
    this.name = buildingEntity.name;
    this.createdAt = new Date(buildingEntity.createdAt).toISOString();
    this.floors = [];

    if (buildingEntity.restrooms) {
      this.restrooms = buildingEntity.restrooms?.map(
        (restroom) => new RestroomDto(restroom),
      );
      const floors = new Set<number>();
      buildingEntity.restrooms.forEach((restroom) => {
        floors.add(restroom.floor);
      });
      this.floors = Array.from(floors).sort((a, b) => a - b);
    }

    if (buildingEntity.restrooms && buildingEntity.restrooms.length !== 0) {
      const recommendRestroom = buildingEntity.restrooms.reduce(
        (prev, curr) => {
          if (prev.floor < 0) return curr;
          if (prev.rating <= curr.rating && prev.floor >= curr.floor)
            return curr;
          return prev;
        },
      );

      this.recommendRestroom = new RestroomDto(recommendRestroom);
    }
  }
}
