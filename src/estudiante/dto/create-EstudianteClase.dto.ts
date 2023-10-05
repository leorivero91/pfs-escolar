import { Estudiante } from "../entities/estudiante.entity";

export class EstudianteClaseDto {
    readonly EstudianteId:number;
    readonly ClaseId: number;
    readonly asistencia : [] ;
    readonly estudiante: Estudiante;
}