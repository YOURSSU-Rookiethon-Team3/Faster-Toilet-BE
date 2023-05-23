import { Module } from '@nestjs/common';
import { RestroomController } from './restroom.controller';
import { RestroomService } from './restroom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestroomEntity } from 'entity/restroom.entity';
import { BuildingEntity } from 'entity/building.entity';

@Module({
  controllers: [RestroomController],
  providers: [RestroomService],
  imports: [TypeOrmModule.forFeature([RestroomEntity, BuildingEntity])],
})
export class RestroomModule {}
