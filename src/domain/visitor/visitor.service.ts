import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitorEntity } from 'entity/visitor.entity';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorEntity)
    private readonly visitorRepository: Repository<VisitorEntity>,
  ) {}

  async getVisitorsCount() {
    const res = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select(`SUM(visitor.count)`, 'count')
      .getRawOne();

    const count = +(res.count || 0);
    return count;
  }

  async postVisitor(token?: string) {
    let visitor = await this.visitorRepository.findOne({
      where: {
        visitorToken: token,
      },
    });

    if (!visitor) {
      visitor = new VisitorEntity({
        visitorToken: await this.getNewToken(),
      });
      visitor = await this.visitorRepository.save(visitor);
    } else {
      visitor.count += 1;
      await this.visitorRepository.save(visitor);
    }

    return {
      visitorToken: visitor.visitorToken,
      visitorsCount: await this.getVisitorsCount(),
    };
  }

  private async getNewToken() {
    return uuidV4();
  }
}
