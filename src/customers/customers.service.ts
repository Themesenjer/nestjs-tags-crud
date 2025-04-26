import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/customers.dto';
import { UpdateCustomerDto } from './dto/custumer-patch.dto';
import { Customer } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    ) {
        console.log('CustomersService constructor');
    }

    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
      console.log('CustomersService create - DTO received:', JSON.stringify(createCustomerDto));
      console.log('CustomersService create - createCustomerDto.email:', createCustomerDto.email);  //  <--  Añadir
      const customer = this.customerRepository.create(createCustomerDto);
      Object.assign(customer, createCustomerDto);
      console.log('CustomersService create - Entity to save:', JSON.stringify(customer));
      console.log('CustomersService create - customer.email:', customer.email);  //  <--  Añadir
      const savedCustomer = await this.customerRepository.save(customer);
      console.log('CustomersService create - Entity saved:', JSON.stringify(savedCustomer));
      console.log('CustomersService create - savedCustomer.email:', savedCustomer.email);  //  <--  Añadir
      return savedCustomer;
    }

    async findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    async findOne(id: number): Promise<Customer> {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        const customer = await this.findOne(id);
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        Object.assign(customer, updateCustomerDto);
        return this.customerRepository.save(customer);
    }

    async remove(id: number): Promise<void> {
        const customer = await this.findOne(id);
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        await this.customerRepository.remove(customer);
    }

    async patch(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        return this.update(id, updateCustomerDto);
    }
}