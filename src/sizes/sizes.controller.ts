import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, UsePipes, ValidationPipe, Patch, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/size.dto/create-size.dto';
import { UpdateSizeDto } from './dto/size.dto/update-size.dto';
import { PartialUpdateSizeDto } from './dto/size.dto/partial-update-size.dto';
import { Size } from './sizes.entity';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
    return await this.sizesService.create(createSizeDto);
  }

  @Get()
  async findAll(
    @Query('ecuador') ecuador?: string,
    @Query('usa') usa?: string,
    @Query('category') category?: string,
  ): Promise<Size[]> {
    if (ecuador || usa || category) {
      return await this.sizesService.find(ecuador, usa, category);
    }
    return await this.sizesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Size> {
    return await this.sizesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSizeDto: UpdateSizeDto): Promise<Size> {
    return await this.sizesService.update(id, updateSizeDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialUpdateSizeDto: PartialUpdateSizeDto,
  ): Promise<Size> {
    return await this.sizesService.update(id, partialUpdateSizeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.sizesService.remove(id);
  }
}