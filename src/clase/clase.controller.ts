import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { CreateClaseDto } from './dto/create-clase.dto';
import { Clase } from './entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

// CRUD
//READ la lectura puede ser por todos los elementos o por uno solo
@Get('raw')
async findAllRaw(): Promise< Clase[]> {
  return await this.claseService.findAll();
}

@Get('obtener/:id')
async buscarId(@Param('id') id:number): Promise <Clase>{
  return await this.claseService.findOne(id);
}

//Create
@Post('crear')
async crearClase(@Body() CreateClaseDto: CreateClaseDto): Promise<boolean>{
  return await this.claseService.create(CreateClaseDto);
}

//UPDATE
@Put('actualizar/:id')
async actualizarClaseId(@Body() CreateClaseDto:CreateClaseDto,@Param ('id') id:number ): Promise<string>{
  return await this.claseService.update(id,CreateClaseDto);
}

//DELETE
 @Delete('eliminar/:id')
 async eliminarClase(@Param ('id')id:number):Promise<boolean>{
   return await this.claseService.delete(id);
  }  
}
