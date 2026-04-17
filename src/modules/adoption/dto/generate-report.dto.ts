import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GenerateReportDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  from_date!: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  to_date!: Date;
}
