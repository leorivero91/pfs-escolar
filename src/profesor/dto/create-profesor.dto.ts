import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";
import { Clase } from "src/clase/entities/clase.entity";

export class CreateProfesorDto {
    readonly nombre:string;
    readonly apellido: string;
    readonly clases: Clase [];
    readonly domicilio: CiudadProfesor [];  
}
