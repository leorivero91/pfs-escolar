import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'escuela'})
export class Escuela {
    //Atributos
    @PrimaryGeneratedColumn()
    idEscuela:number;

    @Column()
    nombre:string;

    @Column()
    domicilio:string;

    @ManyToOne(()=>Ciudad, ciudad=>ciudad.escuelas)
    @JoinColumn({name:"fk_id_ciudad"})
    public ciudad:Ciudad;

    @OneToMany(()=>Clase, clases=>clases.escuela)
    clases:Clase[];


    //Controlador
    constructor(nombre:string,domicilio:string,ciudad:Ciudad,clases:Clase[]){
        this.domicilio=domicilio;
        this.nombre=nombre;
        this.ciudad=ciudad;
        this.clases=clases;
    }

    //Metodos
    public getIdEscuela():number{
        return this.idEscuela;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string){
        this.nombre=nombre;
    }

    public getDomicilio():string{
        return this.domicilio;
    }

    public setDomicilio(domicilio:string){
        this.domicilio=domicilio;
    }
    public getCiudad():Ciudad{
        return this.ciudad;
    }
    public setCiudad(ciudad:Ciudad){
        this.ciudad=ciudad;
    }
    public getClase():Clase[]{
        return this.clases;
    }
    public setClase(clase:Clase[]){
        this.clases=clase;
    }
}
