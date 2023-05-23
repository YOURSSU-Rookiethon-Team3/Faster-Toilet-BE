import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingDto } from './dto/building.dto';
import { PostBuildingReqDto } from './dto/postBuilding.req.dto';
import { PatchBuildingReqDto } from './dto/patchBuilding.req.dto';

@Controller('buildings')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get('/')
  async getBuildings() {
    const buildings = await this.buildingService.getBuildings();

    return {
      buildings: buildings.map((building) => new BuildingDto(building)),
    };
  }

  @Get('/:buildingId')
  async getBuilding(@Param('buildingId') buildingId: string) {
    const building = await this.buildingService.getBuilding(+buildingId);
    return new BuildingDto(building);
  }

  @Post('/')
  async postBuilding(@Body() body: PostBuildingReqDto) {
    await this.buildingService.postBuilding(body.name);
    return;
  }

  @Patch('/:buildingId')
  async patchBuilding(
    @Param('buildingId') buildingId: string,
    @Body() body: PatchBuildingReqDto,
  ) {
    await this.buildingService.patchBuilding(+buildingId, body);
    return;
  }

  @Delete('/:buildingId')
  async deleteBuilding(@Param('buildingId') buildingId: string) {
    await this.buildingService.deleteBuilding(+buildingId);
    return;
  }
}
