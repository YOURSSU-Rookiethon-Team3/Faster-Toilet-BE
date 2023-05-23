import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from 'entity/building.entity';
import { RestroomEntity } from 'entity/restroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(RestroomEntity)
    private readonly restroomRepository: Repository<RestroomEntity>,
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
  ) {}

  async getBuilding(buildingId: number): Promise<BuildingEntity> {
    const building = await this.buildingRepository.findOne({
      where: { id: buildingId },
      relations: ['restrooms'],
    });

    if (!building) {
      throw new NotFoundException({
        code: 'BUILDING_NOT_FOUND',
        message: '건물을 찾을 수 없습니다.',
      });
    }

    return building;
  }
}
