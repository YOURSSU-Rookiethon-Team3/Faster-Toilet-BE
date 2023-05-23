import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base';
import { RestroomEntity } from './restroom.entity';

@Entity('building')
export class BuildingEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 32 })
  name: string;

  @OneToMany(() => RestroomEntity, (restroom) => restroom.building)
  restrooms: RestroomEntity[];

  constructor(name: string) {
    super();
    if (!name) return;
    this.name = name;
  }
}
