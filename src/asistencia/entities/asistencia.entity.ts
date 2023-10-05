import { Clase } from "src/clase/entities/clase.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {

    @PrimaryColumn({name: 'estudianteClaseClaseId'})
    claseId:number;

    @PrimaryColumn({name: 'estudianteClaseEstudianteId'})
    estudianteId:number;

    @Column()
    fecha:Date;

    @ManyToOne(()=>EstudianteClase, estudianteClase=> estudianteClase.asistencias)
    @JoinColumn()
    estudianteClase:EstudianteClase;

    constructor(claseId:number, estudianteId:number, fecha:Date){
        this.claseId=claseId;
        this.estudianteId= estudianteId;
        this.fecha= fecha;
    }

    public getClaseId(): number{
        return this.claseId;
    }

    public setClaseId(claseId:number){
        return this.claseId=claseId;
    }

    public getEstudianteId(): number{
        return this.estudianteId;
    }

    public setEstudianteId(estudianteId:number){
        return this.estudianteId=estudianteId;
    }

    public getFecha():Date{
        return this.fecha;
    }
    public setFecha(fecha:Date){
        this.fecha = fecha;
    }  
    
}
