import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { PetService } from '../pet/pet.service';
import { AdoptDto } from './dto/adopt.dto';
import { GenerateReportDto } from './dto/generate-report.dto';
import { Adoption } from './entities/adoption.entity';
export declare class AdoptionService {
    private readonly adoptionRepository;
    private readonly customerService;
    private readonly petService;
    constructor(adoptionRepository: Repository<Adoption>, customerService: CustomerService, petService: PetService);
    adopt(dto: AdoptDto): Promise<Adoption>;
    getAdoptionRequests(fromDate: Date, toDate: Date): Promise<Adoption[]>;
    generateReport(dto: GenerateReportDto): Promise<{
        adopted_pet_types: Record<string, number>;
        weekly_adoption_requests: Record<string, number>;
    }>;
    private getWeekStartKey;
}
