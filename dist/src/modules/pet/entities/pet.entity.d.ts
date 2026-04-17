import { Adoption } from '../../adoption/entities/adoption.entity';
export declare class Pet {
    id: string;
    type: string;
    gender: string;
    size: string;
    age: string;
    photos: string[];
    good_with_children: boolean;
    adoptions: Adoption[];
}
