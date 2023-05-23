import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from 'entity/building.entity';
import { RestroomEntity } from 'entity/restroom.entity';
import { Repository } from 'typeorm';
import { PostRestroomReqDto } from './dto/postRestroom.req.dto';
import { PatchRestroomReqDto } from './dto/patchRestroom.req.dto';

@Injectable()
export class RestroomService {
  constructor(
    @InjectRepository(RestroomEntity)
    private readonly restroomRepository: Repository<RestroomEntity>,
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
  ) {}

  async getRestroom(restroomId: number): Promise<RestroomEntity> {
    const restroom = await this.restroomRepository.findOne({
      where: { id: restroomId },
      relations: ['building'],
    });

    if (!restroom) {
      throw new NotFoundException({
        code: 'RESTROOM_NOT_FOUND',
        message: '화장실을 찾을 수 없습니다.',
      });
    }

    return restroom;
  }

  async getRestrooms(filter: {
    buildingId?: number;
  }): Promise<RestroomEntity[]> {
    const restrooms = await this.restroomRepository.find({
      relations: ['building'],
      where: filter,
    });
    return restrooms;
  }

  async postRestroom(dto: PostRestroomReqDto) {
    const building = await this.buildingRepository.findOne({
      where: { id: dto.buildingId },
    });

    if (!building) {
      throw new BadRequestException({
        code: 'BUILDING_NOT_FOUND',
        message: '건물을 찾을 수 없습니다.',
      });
    }

    const _dto = {
      ...dto,
      building: building,
    };

    const restroom = new RestroomEntity(_dto);
    await this.restroomRepository.save(restroom);
  }

  async patchRestroom(restroomId: number, dto: PatchRestroomReqDto) {
    const restroom = await this.restroomRepository.findOne({
      where: { id: restroomId },
    });

    if (!restroom) {
      throw new NotFoundException({
        code: 'RESTROOM_NOT_FOUND',
        message: '화장실을 찾을 수 없습니다.',
      });
    }

    const update: any = {};
    if (dto.floor) update['floor'] = dto.floor;
    if (dto.location) update['location'] = dto.location;
    if (dto.isMale) update['isMale'] = dto.isMale;
    if (dto.rating) update['rating'] = dto.rating;
    if (dto.congestion) update['congestion'] = dto.congestion;
    if (dto.vanity) update['vanity'] = dto.vanity;
    if (dto.bidet) update['bidet'] = dto.bidet;
    if (dto.disabled) update['disabled'] = dto.disabled;
    if (dto.extra) update['extra'] = dto.extra;

    await this.restroomRepository.update(restroomId, dto);
  }

  async deleteRestroom(restroomId: number) {
    const restroom = await this.restroomRepository.findOne({
      where: { id: restroomId },
    });

    if (!restroom) {
      throw new NotFoundException({
        code: 'RESTROOM_NOT_FOUND',
        message: '화장실을 찾을 수 없습니다.',
      });
    }

    await this.restroomRepository.delete(restroomId);
  }
}
