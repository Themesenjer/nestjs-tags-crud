import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './sizes.entity';
import { Product } from '../products/products.entity'; // Necesitamos Product aquí

@Module({
  imports: [TypeOrmModule.forFeature([Size, Product])],
  controllers: [SizesController],
  providers: [SizesService],
  exports: [SizesService], // Exportamos el servicio para usarlo en ProductsService
})
export class SizesModule {}