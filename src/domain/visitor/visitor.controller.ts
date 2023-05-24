import { Controller, Get, Post } from '@nestjs/common';

@Controller('visitors')
export class VisitorController {
  @Get('/')
  async getVisitors() {
    return {
      visitorsCount: 10,
    };
  }

  @Post('/')
  async postVisitor() {
    return {
      visitorsCount: 11,
      visitorToken: 'DUMMY_TOKEN',
    };
  }
}
