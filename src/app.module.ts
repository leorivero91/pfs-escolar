import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type":"mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Leonel91",
    "database": "db_colegio",
    "entities": [__dirname + "/**/**/**.entity{.ts,.js}"],
    "synchronize": true //modo desarrollador,
  }), CiudadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
