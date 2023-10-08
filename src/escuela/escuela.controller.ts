import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Get()
  async findAllRaw(): Promise<CreateEscuelaDto> {
    return await this.escuelaService.findAllRaw();
  }

  @Get(':id')
  async findOneById(@Param('idEscuela') idEscuela: number):Promise<CreateEscuelaDto> {
    return await this.escuelaService.findById(idEscuela);
  }

  @Post('crear')
  async crearEscuela(@Body() createEscuelaDto: CreateEscuelaDto):Promise<boolean> {
    return await this.escuelaService.create(createEscuelaDto);
  }

  @Put('actualizar/:id')
  actualizarEscuela(@Param('idEscuela') idEscuela: number, @Body() CreateEscuelaDto: CreateEscuelaDto) {
    return this.escuelaService.update(CreateEscuelaDto,idEscuela);
  }

  @Delete('eliminar/:id')
  eliminarEscuela(@Param('idEscuela') idEscuela: number) {
    return this.escuelaService.delete(idEscuela);
  }
}
