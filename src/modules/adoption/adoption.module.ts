import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from '../customer/customer.module';
import { PetModule } from '../pet/pet.module';
import { AdoptionController } from './adoption.controller';
import { AdoptionService } from './adoption.service';
import { Adoption } from './entities/adoption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adoption]), CustomerModule, PetModule],
  controllers: [AdoptionController],
  providers: [AdoptionService],
})
export class AdoptionModule {}
