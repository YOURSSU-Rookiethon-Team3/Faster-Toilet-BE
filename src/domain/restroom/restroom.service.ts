import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from 'entity/building.entity';
import { RestroomEntity } from 'entity/restroom.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestroomService {
  constructor(
    @InjectRepository(RestroomEntity)
    private readonly restroomRepository: Repository<RestroomEntity>,
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
  ) {}
}
