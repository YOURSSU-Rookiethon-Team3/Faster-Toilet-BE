import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from 'entity/building.entity';

@Module({
  controllers: [BuildingController],
  providers: [BuildingService],
  imports: [TypeOrmModule.forFeature([BuildingEntity])],
})
export class BuildingModule {}
