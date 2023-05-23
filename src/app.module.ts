import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingEntity } from 'entity/building.entity';
import { RestroomEntity } from 'entity/restroom.entity';
import { VisitorEntity } from 'entity/visitor.entity';
import { BuildingModule } from './domain/building/building.module';

dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env'),
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [BuildingEntity, RestroomEntity, VisitorEntity],
      charset: 'utf8mb4',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    BuildingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
