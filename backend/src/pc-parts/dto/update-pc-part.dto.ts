import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdatePcPartDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sku?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  brand?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
