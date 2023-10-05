import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

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

  @Get()
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() EstudianteDto: UpdateEstudianteDto) {
    return this.estudianteService.update(+id, EstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
