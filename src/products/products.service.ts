import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { retry } from 'rxjs';
import { Products } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}
  findAll() {
    return this.productRepository.find();
  }

  async findProductById(id: string) {
    console.log(typeof id, 'TIPO ID');
    const product = this.productRepository.findOne(id);
    if (!product) {
      throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async findProductByVendor(idVendor: string) {
    const products = await this.productRepository.find({ where: { idVendor } });
    console.log(products.length, 'tamaño');
    if (products.length > 0) {
      return products;
    } else {
      return new NotFoundException(`there no products under this id`);
    }
  }

  newProduct(createProductDto: CreateProductsDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async updateProduct(id: string, updateCoffeeDto: UpdateProductsDto) {
    const product = await this.productRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    const product = await this.findProductById(id);
    return this.productRepository.remove(product);
  }
}
