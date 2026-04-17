import { CreatePetDto } from './dto/create-pet.dto';
import { GetPetsQueryDto } from './dto/get-pets-query.dto';
import { PetService } from './pet.service';
export declare class PetController {
    private readonly petService;
    constructor(petService: PetService);
    createPet(createPetDto: CreatePetDto, files: Array<Express.Multer.File>): Promise<{
        status: string;
        pet_id: string;
    }>;
    getPets(query: GetPetsQueryDto): Promise<{
        status: string;
        pets: {
            pet_id: string | undefined;
            source: string;
            type: string | undefined;
            gender: string | undefined;
            size: string | undefined;
            age: string | undefined;
            good_with_children: boolean | undefined;
            photos: string[];
        }[];
    }>;
}
