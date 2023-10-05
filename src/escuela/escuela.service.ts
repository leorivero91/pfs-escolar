import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { CreateEscuelaDto } from './dto/create-escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {
  private escuelas : Escuela [] = [];

  constructor(@InjectRepository(Escuela)
              private escuelaRepository:Repository<Escuela>){}
  
 async findAllRaw():Promise<CreateEscuelaDto>{
  let escuela = await this.escuelaRepository.query("SELECT * from escuela");
              
  escuela.forEach(element => {
   let escuela : Escuela = new Escuela[(element.idEscuela, element.nombre, element.domicilio, element.ciudad, element.clases)]; 
     this.escuelas.push(escuela)
       });
            
  return escuela;
 }

 async findById(idEscuela:number ): Promise<CreateEscuelaDto>{
  try{
    const criterio: FindOneOptions = {where: { idEscuela:idEscuela}};
    const escuela: Escuela = await this.escuelaRepository.findOne(criterio);

    if(escuela){
      const createEscuelaDto : CreateEscuelaDto = {
        nombre: escuela.getNombre(),
        domicilio : escuela.getDomicilio(),
        ciudad: escuela.getCiudad(),
        clase: escuela.getClase()
      }
      return createEscuelaDto;
    } else {
      throw new Error( ' No se encuentra la escuela');
    }
  } catch(error){
    throw new HttpException({
      status: HttpStatus.CONFLICT,
      error: 'Error en findById - '+ error
    }, HttpStatus.NOT_FOUND)
  }
 }
 
 async create(CreateEscuelaDto:CreateEscuelaDto): Promise<boolean>{
  try{
    const escuela = await this.escuelaRepository.save(new Escuela(CreateEscuelaDto.nombre,CreateEscuelaDto.domicilio,CreateEscuelaDto.ciudad,CreateEscuelaDto.clase));
    if(escuela){
      return true;
    } else { 
      throw new Error('No se pudo crear la nueva escuela');
    }
 } catch(error){
  throw new HttpException({
    status: HttpStatus.NOT_FOUND,
    error: ' Error en escuela create - ' + error
  }, HttpStatus.NOT_FOUND)
 }
  }

  async update(createEscuelaDto:CreateEscuelaDto, idEscuela: number): Promise<string> {
    try{
      const criterio: FindOneOptions = {where: {idEscuela:idEscuela}}
    
      let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
      let escuelaVieja = {
        nombre: escuela.getNombre(),
        domicilio: escuela.getDomicilio(),
        ciudad : escuela.getCiudad(),
        clase : escuela.getClase()
      };
      if(escuela){
        escuela.setNombre(createEscuelaDto.nombre),
        escuela.setDomicilio(createEscuelaDto.domicilio),
        escuela.setCiudad(createEscuelaDto.ciudad),
        escuela.setClase(createEscuelaDto.clase);
      escuela = await this.escuelaRepository.save(escuela);
      return `Se reemplazo: ${escuelaVieja} --> ${escuela.getNombre()},${escuela.getDomicilio},${escuela.getCiudad},${escuela.getClase} `
      } else{
        return 'No se pudo reemplazar ';
      }
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: ' Error en escuela update - ' + error
      }, HttpStatus.NOT_FOUND)
     }
    }
  

   async delete(idEscuela:number): Promise<any>{
    try{
      const criterio: FindOneOptions = { where: {idEscuela:idEscuela} };
      let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
      if(!escuela)
       throw new Error('No se pudo eliminar la escuela ') 
      else { 
        await this.escuelaRepository.remove(escuela);
        return { idEscuela:idEscuela,
              message: ' se elimino correctamente la escuela'};
      }
    } catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: ' Error en escuela delete - ' + error
      }, HttpStatus.NOT_FOUND)
    }
   }
}