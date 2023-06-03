import { IsNotEmpty, IsOptional } from 'class-validator';
export class ProductInputDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  category: string;
  @IsOptional()
  dateCreated: number;
}
