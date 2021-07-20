import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
/**si falla poner app module como provider */

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
