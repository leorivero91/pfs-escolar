import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Asistencia } from "src/asistencia/entities/asistencia.entity";
import { Clase } from "src/clase/entities/clase.entity";


@Entity('clase_estudiante')
export class EstudianteClase{

    @PrimaryColumn()
    estudianteId:number;

    @PrimaryColumn()
    claseId:number;

    constructor(estudianteId:number, claseId:number,){
        this.estudianteId=estudianteId;
        this.claseId= claseId;
    }

    @ManyToOne(()=> Estudiante,estudiante=>estudiante.estudianteClases)
    @JoinColumn()
    estudiante:Estudiante;

    @ManyToOne(()=> Clase,clase=>clase.estudianteClases)
    @JoinColumn()
    clase:Clase;
    
    @OneToMany(()=>Asistencia, asistencia=>asistencia.estudianteClase)
    asistencias:Asistencia[];

    public getEstudianteId():number{
        return this.estudianteId;
    }

    public setEstudianteId(estudianteId:number){
        this.estudianteId=estudianteId;
    }
    public getClaseId():number{
        return this.claseId;
    }
    public setClaseId(claseId:number){
        this.claseId=claseId;
    }
    public getClase():Clase{
        return this.clase;
    }
    public setClase(clase:Clase){
        this.clase=clase;
    }
    public getEstudiante():Estudiante{
        return this.estudiante;
    }
    public setEstudiante(estudiante:Estudiante){
        this.estudiante=estudiante;
    }
    public getAsistencia(): Asistencia [] {
        return this.asistencias; 
    }
    public setAsistencia(asistencia: Asistencia []) {
        this.asistencias = asistencia; 
    }
}