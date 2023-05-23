import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestroomService } from './restroom.service';
import { RestroomDto } from './dto/restroom.dto';
import { PostRestroomReqDto } from './dto/postRestroom.req.dto';
import { PatchRestroomReqDto } from './dto/patchRestroom.req.dto';

@Controller('restrooms')
export class RestroomController {
  constructor(private readonly restroomService: RestroomService) {}

  @Get('/')
  async getRestrooms() {
    const restrooms = await this.restroomService.getRestrooms({});
    return {
      restrooms: restrooms.map((restroom) => new RestroomDto(restroom)),
    };
  }

  @Get('/:restroomId')
  async getRestroom(@Param('restroomId') restroomId: string) {
    const restroom = await this.restroomService.getRestroom(+restroomId);
    return new RestroomDto(restroom);
  }

  @Post('/')
  async postRestroom(@Body() body: PostRestroomReqDto) {
    await this.restroomService.postRestroom(body);
    return;
  }

  @Patch('/:restroomId')
  async patchRestroom(
    @Param('restroomId') restroomId: string,
    @Body() body: PatchRestroomReqDto,
  ) {
    await this.restroomService.patchRestroom(+restroomId, body);
    return;
  }

  @Delete('/:restroomId')
  async deleteRestroom(@Param('restroomId') restroomId: string) {
    await this.restroomService.deleteRestroom(+restroomId);
    return;
  }
}
