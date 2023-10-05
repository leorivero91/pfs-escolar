import { EstudianteClase } from "../entities/estudiante_clase.entity";

export class EstudianteDto {
    readonly nombre:string;
    readonly apellido;string;
    readonly fecha_nacimiento:Date;
    readonly estudianteClase: EstudianteClase[];
}
