import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { EstudianteClaseDto } from './dto/create-EstudianteClase.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get('raw')
  async getAllRaw():Promise<EstudianteDto[]>{
      return await this.estudianteService.findAllRaw();
  }

  @Post()
  create(@Body() EstudianteDto: EstudianteDto) {
    return this.estudianteService.create(EstudianteDto);
  }

  @Post('agregar-clase')
  async addClase(@Body()body:any):Promise<any>{
    return this.estudianteService.addClase(body);
  }

  @Get(':id')
  async getId(@Param('id') id: number) : Promise<EstudianteDto> {
    return this.estudianteService.findById(id);
  }

  @Put('actualizar/:id')
  async actualizarEstudiante(@Body() EstudianteDto: EstudianteDto, @Param('id') id: number) {
    return this.estudianteService.update(EstudianteDto,id);
  }

  @Delete('eliminar/:id')
  async eliminarEstudiante(@Param('id') id: number){
    return this.estudianteService.delete(id);
  }
}
