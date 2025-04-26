import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './customers.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}