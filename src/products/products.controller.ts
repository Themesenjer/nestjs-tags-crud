import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, UsePipes, ValidationPipe, Patch, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto/create-product.dto';
import { UpdateProductDto } from './dto/products.dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/products.dto/partial-update-product.dto';
import { Product } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('description') description?: string,
  ): Promise<Product[]> {
    if (name || description) {
      return await this.productsService.find(name, description);
    }
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdateProductDto: PartialUpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, partialUpdateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.remove(id);
  }
}