import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/users.entity';
import { Customer } from '../customers/customers.entity';
import { Size } from '../sizes/sizes.entity'; 

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Customer, customer => customer.products)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column()
  customerId: number;

  @ManyToMany(() => Size, size => size.products, { cascade: true }) // Añadimos la relación ManyToMany
  @JoinTable({
    name: 'product_sizes',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sizeId', referencedColumnName: 'id' },
  })
  sizes: Size[];
}