import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Get('raw')
  async getAllRaw():Promise<Asistencia[]> {
    return await this.asistenciaService.getAllRaw();
  }

  @Get('orm')
  async findAllOrm():Promise<Asistencia[]> {
    return await this.asistenciaService.findAllOrm();
  }

  @Get(':claseId/:estudianteId')
  async findOneById(@Param('claseId') claseId: number, @Param('estudianteId') estudianteId:number):Promise<Asistencia> {
    return await this.asistenciaService.findOneById(claseId,estudianteId);
  }
  
  @Post('create')
  async create(@Body() createAsistenciaDto: CreateAsistenciaDto):Promise<any> {
    return await this.asistenciaService.create(createAsistenciaDto);
  }

  @Put(':claseId/:estudianteId')
  async actualizarAsistencia(@Param('claseId') claseId: number, @Param('estudianteId') estudianteId:number, @Body() CreateAsistenciaDto: CreateAsistenciaDto):Promise<any> {
    return  this.asistenciaService.update(CreateAsistenciaDto,claseId,estudianteId);
  }

  @Delete(':claseId/:estudianteId')
  async delete(@Param('claseId') claseId: number, @Param('estudianteId') estudianteId:number):Promise<Asistencia> {
    return await this.asistenciaService.delete(claseId,estudianteId);
  }
}
