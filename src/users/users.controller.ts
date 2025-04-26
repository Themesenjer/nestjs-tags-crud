import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete, Patch, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUpdateUserDto } from './dto/partial-update-user.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() partialUpdateUserDto: PartialUpdateUserDto): Promise<User> {
    return await this.usersService.update(id, partialUpdateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}