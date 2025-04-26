import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ecuador: string;

  @Column()
  usa: string;

  @Column()
  category: string; // 'Hombre', 'Mujer', 'Niño', 'Niña'

  @ManyToMany(() => Product, product => product.sizes)
  products: Product[];
}