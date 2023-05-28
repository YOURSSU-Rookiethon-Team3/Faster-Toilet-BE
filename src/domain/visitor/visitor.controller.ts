import { Body, Controller, Get, Post } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { PostVisitorReqDto } from './dto/postVisitor.req.dto';

@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get('/')
  async getVisitors() {
    const count = await this.visitorService.getVisitorsCount();

    return {
      visitorsCount: count,
    };
  }

  @Post('/')
  async postVisitor(@Body() body: PostVisitorReqDto) {
    return await this.visitorService.postVisitor(body.visitorToken);
  }
}
