import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Importa UpdateUserDto
import * as bcrypt from 'bcrypt'; // Importa bcrypt

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, identificacion } = createUserDto;

    // Verificar si el email o identificacion ya existen
    const existingUser = await this.userRepository.findOne({ where: [{ email }, { identificacion }] });
    if (existingUser) {
      throw new BadRequestException('El correo electrónico o identificación ya están en uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ name, email, password: hashedPassword, identificacion });
    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const { password, ...restOfDto } = updateUserDto;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    Object.assign(user, restOfDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}