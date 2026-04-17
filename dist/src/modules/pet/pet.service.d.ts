import { Repository } from 'typeorm';
import { ExternalApiService } from '../external-api/external-api.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsQueryDto } from './dto/get-pets-query.dto';
import { Pet } from './entities/pet.entity';
export declare class PetService {
    private readonly petRepository;
    private readonly externalApiService;
    constructor(petRepository: Repository<Pet>, externalApiService: ExternalApiService);
    create(createPetDto: CreatePetDto, photos: string[]): Promise<Pet>;
    getPets(query: GetPetsQueryDto): Promise<Array<Pet | Partial<Pet>>>;
    existsById(id: string): Promise<boolean>;
}
