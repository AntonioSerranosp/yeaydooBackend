import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dto/create-user.dto';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  /**
   *
   * @returns All the Products
   */
  @Get()
  findAll() {
    // return `Esto debe regresar todos los productos`;
    return this.productsService.findAll();
  }
  /**
   *
   * @param id
   * @returns  A product
   */
  @Get(':id')
  findProductById(@Param('id') id: number) {
    return this.productsService.findProductById('' + id);
  }
  /**
   *
   * @param id
   * @returns products that has an specific idVendor
   */
  @Get('vendor/:id')
  findProductByVendor(@Param('id') id: number) {
    // return
    return this.productsService.findProductByVendor('' + id);
  }
  /**
   *
   * @param createUserDto
   * @returns
   */
  @Post()
  newProduct(@Body() createProductDto: CreateProductsDto) {
    return this.productsService.newProduct(createProductDto);
  }
  /**
   *
   * @param id
   * @param updateProductsDto
   * @returns
   */
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductsDto,
  ) {
    return this.productsService.updateProduct(id, updateProductsDto);
  }
  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
