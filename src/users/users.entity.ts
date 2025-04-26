import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from '../products/products.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    identificacion: string;

    @OneToMany(() => Product, product => product.user)
    products: Product[];
}