import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { SizesModule } from '../sizes/sizes.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SizesModule], 
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}