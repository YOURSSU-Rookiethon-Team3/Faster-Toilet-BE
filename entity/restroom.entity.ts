import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base';
import { BuildingEntity } from './building.entity';

@Entity('restroom')
export class RestroomEntity extends BaseEntity {
  @Column({ type: 'int' })
  floor: number;

  @Column({ type: 'varchar', length: 64 })
  location: string;

  @Column({ type: 'boolean' })
  isMale: boolean;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'int' })
  congestion: number;

  @Column({ type: 'boolean' })
  vanity: boolean;

  @Column({ type: 'boolean' })
  bidet: boolean;

  @Column({ type: 'boolean' })
  disabled: boolean;

  @Column({ length: 64 })
  extra: string;

  @ManyToOne(() => BuildingEntity, (building) => building.restrooms)
  @JoinColumn({ name: 'pk_building' })
  building: BuildingEntity;

  @Column({ type: 'int' })
  pk_building: number;

  constructor(restroom: {
    floor: number;
    location: string;
    isMale: boolean;
    rating: number;
    congestion: number;
    vanity: boolean;
    bidet: boolean;
    disabled: boolean;
    extra: string;
    building: BuildingEntity;
  }) {
    super();
    if (!restroom) return;
    this.floor = restroom.floor;
    this.location = restroom.location;
    this.isMale = restroom.isMale;
    this.rating = restroom.rating;
    this.congestion = restroom.congestion;
    this.vanity = restroom.vanity;
    this.bidet = restroom.bidet;
    this.disabled = restroom.disabled;
    this.extra = restroom.extra;
    this.building = restroom.building;
  }
}
