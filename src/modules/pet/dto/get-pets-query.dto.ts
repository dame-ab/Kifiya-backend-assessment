import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class GetPetsQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (Array.isArray(value)) return value;
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  })
  @IsArray()
  type?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (Array.isArray(value)) return value;
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  })
  @IsArray()
  gender?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (Array.isArray(value)) return value;
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  })
  @IsArray()
  size?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') return undefined;
    if (Array.isArray(value)) return value;
    return String(value)
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  })
  @IsArray()
  age?: string[];

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  good_with_children?: boolean;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  limit!: number;
}
