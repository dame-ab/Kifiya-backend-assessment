import { IsNotEmpty, IsUUID } from 'class-validator';

export class AdoptDto {
  @IsUUID()
  @IsNotEmpty()
  customer_id!: string;

  @IsUUID()
  @IsNotEmpty()
  pet_id!: string;
}
