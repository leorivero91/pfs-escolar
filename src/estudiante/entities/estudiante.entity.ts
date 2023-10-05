import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteClase } from "./estudiante_clase.entity";


@Entity({name: 'estudiantes'})
export class Estudiante {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    fecha_nacimiento:Date;

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.estudiante)
    estudianteClases:EstudianteClase[];

    constructor(nombre:string,apellido:string,fecha:Date){
        this.nombre=nombre;
        this.apellido=apellido;
        this.fecha_nacimiento=fecha;
    }

    public getId():number{
        return this.id;
    }

    public getNombre():string{
        return this.nombre;
    }
    public setNombre(nombre:string){
        this.nombre=nombre;
    }
    public getApellido():string{
        return this.apellido;
    }
    public setApellido(apellido:string){
        this.apellido=apellido;
    }
    public getFechaNacimiento():Date{
        return this.fecha_nacimiento;
    }
    public setFechaNacimiento(fecha:Date){
        this.fecha_nacimiento=fecha;
    }
    public getEstudianteClase():EstudianteClase []{
        return this.estudianteClases;
    }
    public setEstudianteClase(estudianteClase:EstudianteClase []){
        this.estudianteClases=estudianteClase;
    }




}
