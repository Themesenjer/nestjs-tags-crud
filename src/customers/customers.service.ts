import { Injectable } from '@nestjs/common';
import {Customer} from './interface/customers/customer.interface';
import { CustumerPatchDto } from './dto/custumer-patch.dto';


@Injectable()
export class CustomersService {
    private customers : Customer[] = [
        {
            id: 0,
            name: 'Diego Yanez',
            age: 31,
            birthday: new Date('1999-02-06'),
            recidence: 'Centro Historico Quito',
        },
        {
            id: 1,
            name: 'Miguel Sosa',
            age: 27,
            birthday: new Date('1998-02-06'),
            recidence: 'Centro Historico Quito',
        },
        {
            id: 2,
            name: 'Cristian Redin',
            age: 26,
            birthday: new Date('1997-02-06'),
            recidence: 'Centro Historico Quito',
        },
    ]

    //READ DEL CRUD
    getCustomers(): Customer[] {
        return this.customers;
    }

    getCustomersById(id: number): Customer | undefined{
        return this.customers.find((item: Customer) => item.id == id);
    }

    //CREATE DEL CRUD

    insert(body: any) {
        this.customers = [
            ...this.customers,
            {
                id: this.lastId() + 1,
                name: body.name,
                age: body.age,
                birthday: body.birthday,
                recidence: body.recidence,
            }
        ];
    }

    private lastId(): number {
        return this.customers[this.customers.length - 1].id;
    }

    //UPDATE DEL CRUD

    update(id: number, body: any) {
        let customer: Customer = {
            id,
            name: body.name,
            age: body.age,
            birthday: body.birthday,
            recidence: body.recidence
        }
        this.customers = this.customers.map( (item: Customer) => {
            console.log(item, id, item.id == id);
            return item.id == id? customer : item;
        }
        )
    }

    //PATCH EN EL SERVICIO PARA USO CON DTO

    patch(id: number, body: CustumerPatchDto) {
        let previusCustomer = this.getCustomersById(id);
        if(!previusCustomer) throw new Error('Customer No existe');

        let customer = {
            ...previusCustomer,
            ...body,
            id: previusCustomer.id
        }
        this.customers = this.customers.map((item) => {
            return item.id == id ? customer : item;
        });
        return customer;
    }

    //DELETE DENTRO DEL CRUD

    delete(id: number) {
        this.customers = this.customers.filter( (item: Customer) => item.id != id);
    }
}
