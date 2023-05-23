import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from 'entity/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingService {
  constructor(
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

  async getBuildings(): Promise<BuildingEntity[]> {
    const buildings = await this.buildingRepository.find({
      relations: ['restrooms'],
    });
    return buildings;
  }

  async postBuilding(name: string) {
    const alreadyExist = await this.buildingRepository.findOne({
      where: { name },
    });

    if (alreadyExist) {
      throw new BadRequestException({
        code: 'BUILDING_ALREADY_EXIST',
        message: '이미 존재하는 건물입니다.',
      });
    }

    const building = new BuildingEntity(name);
    await this.buildingRepository.save(building);
    return;
  }

  async patchBuilding(
    buildingId: number,
    data: {
      name?: string;
    },
  ) {
    const building = await this.buildingRepository.findOne({
      where: { id: buildingId },
    });

    if (!building) {
      throw new NotFoundException({
        code: 'BUILDING_NOT_FOUND',
        message: '건물을 찾을 수 없습니다.',
      });
    }

    if (data.name) {
      building.name = data.name;
    }

    await this.buildingRepository.save(building);
  }

  async deleteBuilding(buildingId: number) {
    const building = await this.buildingRepository.findOne({
      where: { id: buildingId },
    });

    if (!building) {
      throw new NotFoundException({
        code: 'BUILDING_NOT_FOUND',
        message: '건물을 찾을 수 없습니다.',
      });
    }

    await this.buildingRepository.remove(building);
  }
}
