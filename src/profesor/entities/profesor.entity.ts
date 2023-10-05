import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {IsNotEmpty} from "class-validator";
import { Clase } from "src/clase/entities/clase.entity";
import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";

@Entity({name: 'profesor'})
export class Profesor {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    @IsNotEmpty()
    apellido: string;

    @OneToMany(()=>Clase, clase=>clase.profesor)
    clases:Clase[];

    @OneToMany(()=>CiudadProfesor, domicilios=>domicilios.ciudad)
    public domicilios:CiudadProfesor[];

    
    constructor(nombre:string,apellido:string,domicilios:CiudadProfesor []){
        this.nombre=nombre;
        this.apellido=apellido;
        this.domicilios= domicilios;
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
        this.apellido=apellido
    }
    public getClase(): Clase []{
        return this.clases;
    }
    public setClase(clase:Clase[]){
        this.clases=clase;
    }
    public getDomicilios():CiudadProfesor[]{
        return this.domicilios;
    }
    public setDomicilios(domicilios:CiudadProfesor[]){
        this.domicilios=domicilios;
    }


}
