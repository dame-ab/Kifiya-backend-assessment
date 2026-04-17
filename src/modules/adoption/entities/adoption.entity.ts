import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Pet } from '../../pet/entities/pet.entity';

@Entity('adoptions')
export class Adoption {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Customer, (customer) => customer.adoptions, { eager: false })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @ManyToOne(() => Pet, (pet) => pet.adoptions, { eager: false })
  @JoinColumn({ name: 'pet_id' })
  pet!: Pet;

  @CreateDateColumn({ type: 'timestamptz' })
  request_date!: Date;

  @Column({ default: false })
  finalized!: boolean;
}
