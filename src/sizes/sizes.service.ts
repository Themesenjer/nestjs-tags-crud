import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Size } from './sizes.entity';
import { CreateSizeDto } from './dto/size.dto/create-size.dto';
import { UpdateSizeDto } from './dto/size.dto/update-size.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const newSize = this.sizeRepository.create(createSizeDto);
    return await this.sizeRepository.save(newSize);
  }

  async findAll(): Promise<Size[]> {
    return await this.sizeRepository.find();
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOneBy({ id });
    if (!size) {
      throw new NotFoundException(`Talla con ID ${id} no encontrada`);
    }
    return size;
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    const size = await this.findOne(id);
    Object.assign(size, updateSizeDto);
    return await this.sizeRepository.save(size);
  }

  async remove(id: number): Promise<void> {
    const size = await this.findOne(id);
    await this.sizeRepository.remove(size);
  }

  async findOrCreate(ecuador: string, usa: string, category: string): Promise<Size> {
    const existingSize = await this.sizeRepository.findOne({
      where: { ecuador, usa, category },
    });

    if (existingSize) {
      return existingSize;
    }

    const newSize = this.sizeRepository.create({ ecuador, usa, category });
    return await this.sizeRepository.save(newSize);
  }

  async find(ecuador?: string, usa?: string, category?: string): Promise<Size[]> {
    const where: FindOptionsWhere<Size> = {};
    if (ecuador) {
      where.ecuador = ecuador;
    }
    if (usa) {
      where.usa = usa;
    }
    if (category) {
      where.category = category;
    }
    return await this.sizeRepository.find({ where });
  }
}