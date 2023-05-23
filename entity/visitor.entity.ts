import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity('visitor')
export class VisitorEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  visitorToken: string;

  @Column({ type: 'int' })
  count: number;
}
