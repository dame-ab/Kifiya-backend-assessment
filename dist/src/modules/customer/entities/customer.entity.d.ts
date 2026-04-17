import { Adoption } from '../../adoption/entities/adoption.entity';
export declare class Customer {
    id: string;
    name: string;
    phone: string;
    adoptions: Adoption[];
}
