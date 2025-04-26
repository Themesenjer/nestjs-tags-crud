import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { UsersController } from './users/users.controller';
import { ProductsService } from './products/products.service';
import { CustomersService } from './customers/customers.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SizesModule } from './sizes/sizes.module'; 

//se importan las entidades para las relaciones
import { Customer } from './customers/customers.entity';
import { Product } from './products/products.entity';
import { User } from './users/users.entity';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ProductsModule,
    TagsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1722.pjrr',
      database: 'proyecto_base',
      entities: [Customer, Product, User], // Ahora funciona porque las clases están importadas
      retryDelay: 3000,
      autoLoadEntities: true,
      synchronize: true, // SOLO PARA DESARROLLO
      logging: true,
    }),
    UsersModule,
    CustomersModule,
    SizesModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}