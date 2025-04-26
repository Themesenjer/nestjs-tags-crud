import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/products.dto/create-product.dto';
import { UpdateProductDto } from './dto/products.dto/update-product.dto';
import { SizesService } from '../sizes/sizes.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly sizesService: SizesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { sizes, ...productData } = createProductDto;
    const newProduct = this.productRepository.create(productData);

    if (sizes && Array.isArray(sizes)) {
      newProduct.sizes = await Promise.all(
        sizes.map(async (sizeDto) => {
          return await this.sizesService.findOrCreate(
            sizeDto.ecuador,
            sizeDto.usa,
            sizeDto.category,
          );
        }),
      );
    }

    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['user', 'customer', 'sizes'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user', 'customer', 'sizes'],
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { sizes, ...productData } = updateProductDto;
    const product = await this.findOne(id);
    Object.assign(product, productData);

    if (sizes && Array.isArray(sizes)) {
      product.sizes = await Promise.all(
        sizes.map(async (sizeDto) => {
          return await this.sizesService.findOrCreate(
            sizeDto.ecuador,
            sizeDto.usa,
            sizeDto.category,
          );
        }),
      );
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async find(name?: string, description?: string): Promise<Product[]> {
    const where: FindOptionsWhere<Product> = {};
    if (name) {
      where.name = name;
    }
    if (description) {
      where.description = description;
    }
    return await this.productRepository.find({ where, relations: ['user', 'customer', 'sizes'] });
  }
}