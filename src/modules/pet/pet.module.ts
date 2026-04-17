import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalApiModule } from '../external-api/external-api.module';
import { PetController } from './pet.controller';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), ExternalApiModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService, TypeOrmModule],
})
export class PetModule {}
