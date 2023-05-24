import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorEntity } from 'entity/visitor.entity';

@Module({
  controllers: [VisitorController],
  providers: [VisitorService],
  imports: [TypeOrmModule.forFeature([VisitorEntity])],
})
export class VisitorModule {}
