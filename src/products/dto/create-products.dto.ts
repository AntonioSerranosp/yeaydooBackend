import { IsInt, IsString } from 'class-validator';
export class CreateProductsDto {
  @IsString()
  readonly name: string;
  @IsInt()
  readonly price: number;
  @IsInt()
  readonly quantity: number;
  @IsString()
  readonly sku: string;
  @IsInt()
  readonly idVendor: number;
}
