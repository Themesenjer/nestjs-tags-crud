import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Patch,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { CustomersService } from './customers.service';
  import { CreateCustomerDto } from './dto/customers.dto';
  import { UpdateCustomerDto } from './dto/custumer-patch.dto';
  import { Customer } from './customers.entity'; 
  
  @Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {
    console.log('CustomersController constructor');
  }
  
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
      console.log('CustomersController create - DTO received:', JSON.stringify(createCustomerDto));
      try {
          const result = await this.customersService.create(createCustomerDto);
          console.log('CustomersController create - Service result:', JSON.stringify(result));
          return result;
      } catch (error) {
          console.error('CustomersController create - Error:', error);
          throw error; 
      }
  }
  
    @Get()
    async findAll(): Promise<Customer[]> {
      return this.customersService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
      return this.customersService.findOne(id);
    }
  
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCustomerDto: UpdateCustomerDto,
    ): Promise<Customer> {
      return this.customersService.update(id, updateCustomerDto);
    }
  
    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async patch(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateCustomerDto: UpdateCustomerDto,
    ): Promise<Customer> {
      return this.customersService.update(id, updateCustomerDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      await this.customersService.remove(id);
    }
  
    // Removed Query examples for clarity
  }