import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clase/entities/clase.entity";

export class CreateEscuelaDto {
    readonly nombre:string;
    readonly domicilio:string;
    readonly ciudad: Ciudad;
    readonly clase:Clase [];    
}
