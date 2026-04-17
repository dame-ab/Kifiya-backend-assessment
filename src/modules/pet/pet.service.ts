import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ExternalApiService } from '../external-api/external-api.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsQueryDto } from './dto/get-pets-query.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    private readonly externalApiService: ExternalApiService,
  ) {}

  async create(createPetDto: CreatePetDto, photos: string[]): Promise<Pet> {
    const pet = this.petRepository.create({
      ...createPetDto,
      photos,
    });
    return this.petRepository.save(pet);
  }

  async getPets(query: GetPetsQueryDto): Promise<Array<Pet | Partial<Pet>>> {
    const { limit, ...filters } = query;
    const where: Record<string, unknown> = {};

    if (filters.type?.length) where.type = In(filters.type);
    if (filters.gender?.length) where.gender = In(filters.gender);
    if (filters.size?.length) where.size = In(filters.size);
    if (filters.age?.length) where.age = In(filters.age);
    if (filters.good_with_children !== undefined) {
      where.good_with_children = filters.good_with_children;
    }

    const localPets = await this.petRepository.find({
      where,
      take: limit,
      order: { id: 'ASC' },
    });

    if (localPets.length >= limit) {
      return localPets;
    }

    const remaining = limit - localPets.length;
    const externalPets = await this.externalApiService.fetchPets(remaining);
    return [...localPets, ...externalPets];
  }

  async existsById(id: string): Promise<boolean> {
    const count = await this.petRepository.count({ where: { id } });
    return count > 0;
  }
}
