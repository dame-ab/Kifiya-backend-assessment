import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class AddCustomerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsPhoneNumber()
  phone!: string;
}
