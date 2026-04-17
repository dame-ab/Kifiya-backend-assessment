import { Customer } from '../../customer/entities/customer.entity';
import { Pet } from '../../pet/entities/pet.entity';
export declare class Adoption {
    id: string;
    customer: Customer;
    pet: Pet;
    request_date: Date;
    finalized: boolean;
}
