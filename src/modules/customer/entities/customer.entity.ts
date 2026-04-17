import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Adoption } from '../../adoption/entities/adoption.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  phone!: string;

  @OneToMany(() => Adoption, (adoption) => adoption.customer)
  adoptions!: Adoption[];
}
