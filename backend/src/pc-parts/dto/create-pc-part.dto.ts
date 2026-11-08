import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePcPartDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  sku!: string;
  @IsString()
  @IsNotEmpty()
  brand!: string;
  @IsString()
  @IsNotEmpty()
  category!: string;
  @IsInt()
  @Min(0)
  quantity!: number;
  @IsNumber()
  @Min(0)
  price!: number;
}
