import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get('raw')
  async findAllRaw(): Promise <Profesor>{
    return await this.profesorService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number):Promise<CreateProfesorDto> {
    return this.profesorService.findOne(id);
  }

  @Post('agregar-domicilio')
  async addDomicilio(@Body() body: any): Promise<any> {
    return this.profesorService.createDomicilio(body);
  }
  
  @Post('crear')
  async crearProfesor(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Put('actualizar/:id')
  async actualizarProfesor(@Body() createProfesorDto: CreateProfesorDto,@Param('id') id: number):Promise<string>{
    return await this.profesorService.update(id,createProfesorDto);
  }

  @Delete('eliminar/:id')
  async delete(@Param('id') id: string) {
    return this.profesorService.remove(+id);
  }


  

}