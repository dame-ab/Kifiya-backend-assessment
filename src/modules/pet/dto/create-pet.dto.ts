import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  gender!: string;

  @IsString()
  @IsNotEmpty()
  size!: string;

  @IsString()
  @IsNotEmpty()
  age!: string;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  good_with_children!: boolean;
}
