import { Escuela } from "src/escuela/entities/escuela.entity";
import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";

export class CreateClaseDto {
    readonly nombre: string;
    readonly profesor: Profesor;
    readonly escuela: Escuela;
    readonly estudianteClase: EstudianteClase [];
}