import { PartialType } from '@nestjs/mapped-types';
import { EstudianteDto } from './create-estudiante.dto';

export class UpdateEstudianteDto extends PartialType(EstudianteDto) {}
