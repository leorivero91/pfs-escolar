import { Escuela } from "src/escuela/entities/escuela.entity";
import { EstudianteClase } from "src/estudiante/entities/estudiante_clase.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clase'})
export class Clase {
    //Atributos

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToOne(()=>Profesor, profesor=>profesor.clases)
    @JoinColumn({name:"fk_id_profesor"})
    profesor:Profesor;

    @ManyToOne(()=>Escuela, escuela=>escuela.clases)
    @JoinColumn({name:"fk_id_escuela"})
    escuela:Escuela;

    // @ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
    // @JoinColumn({name:"clase_estudiante"})
    // estudiantes:Estudiante[];

    @OneToMany(()=>EstudianteClase,estudianteclases=>estudianteclases.clase)
    estudianteClases: EstudianteClase[];

    //Constructor
    constructor(nombre:string, profesor:Profesor, escuela:Escuela, estudianteClase:EstudianteClase[]){
        this.nombre=nombre;
        this.profesor=profesor;
        this.escuela=escuela;
        this.estudianteClases=estudianteClase;
    }

    //Getters and Setters

    public getId(): number{
        return this.id;
    }
    
    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(nombre: string) {
        this.nombre = nombre;
    }
    public getProfesor():Profesor{
        return this.profesor;
    }
    public setProfesor(profesor:Profesor){
        this.profesor=profesor;
    }
    public getEscuela():Escuela{
        return this.escuela;
    }
    public setEscuela(escuela:Escuela){
        this.escuela=escuela;
    }
    public getEstudianteClase():EstudianteClase[]{
        return this.estudianteClases;
    }
    public setEstudianteClase(estudianteClase:EstudianteClase[]){
        this.estudianteClases=estudianteClase;
    }


}
