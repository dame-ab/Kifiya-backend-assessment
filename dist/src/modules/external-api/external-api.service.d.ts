import { HttpService } from '@nestjs/axios';
import { Pet } from '../pet/entities/pet.entity';
export declare class ExternalApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    fetchPets(limit: number): Promise<Partial<Pet>[]>;
    private mapSizeFromWeight;
    private mapAgeFromLifeSpan;
}
