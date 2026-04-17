import { AdoptDto } from './dto/adopt.dto';
import { DateRangeQueryDto } from './dto/date-range-query.dto';
import { GenerateReportDto } from './dto/generate-report.dto';
import { AdoptionService } from './adoption.service';
export declare class AdoptionController {
    private readonly adoptionService;
    constructor(adoptionService: AdoptionService);
    adopt(dto: AdoptDto): Promise<{
        status: string;
        adoption_id: string;
    }>;
    getAdoptionRequests(query: DateRangeQueryDto): Promise<{
        status: string;
        data: {
            customer_id: string;
            customer_phone: string;
            customer_name: string;
            pet_id: string;
            type: string;
            gender: string;
            size: string;
            age: string;
            good_with_children: boolean;
        }[];
    }>;
    generateReport(dto: GenerateReportDto): Promise<{
        status: string;
        data: {
            adopted_pet_types: Record<string, number>;
            weekly_adoption_requests: Record<string, number>;
        };
    }>;
}
