import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Adoption } from '../../adoption/entities/adoption.entity';

@Entity('pets')
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  type!: string;

  @Column()
  gender!: string;

  @Column()
  size!: string;

  @Column()
  age!: string;

  @Column('text', { array: true, default: '{}' })
  photos!: string[];

  @Column({ default: false })
  good_with_children!: boolean;

  @OneToMany(() => Adoption, (adoption) => adoption.pet)
  adoptions!: Adoption[];
}
