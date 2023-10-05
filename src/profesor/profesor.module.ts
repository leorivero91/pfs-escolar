import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Profesor,Clase,Ciudad,Escuela,CiudadProfesor])],
  controllers: [ProfesorController],
  providers: [ProfesorService]
})
export class ProfesorModule {}
