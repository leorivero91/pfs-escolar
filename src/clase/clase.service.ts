import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateClaseDto } from './dto/create-clase.dto';

@Injectable()
export class ClaseService {
  private clases : Clase[] = [];

  constructor(
    @InjectRepository(Clase)
    private claseRepository:Repository<Clase>){}

  async findAllRaw():Promise<Clase[]>{
    this.clases = [];
    let datos = await this.claseRepository.query("select * from clases");

    datos.forEach(element => {
          let clase : Clase = new Clase[(element.nombre, element.profesor, element.escuela, element.estudianteClase)]; 
          this.clases.push(clase)
      });

      return this.clases;
  }
  
    async create(CreateClaseDto: CreateClaseDto):Promise<boolean>{
    let clase:Clase = await this.claseRepository.save(new Clase(CreateClaseDto.nombre,CreateClaseDto.profesor,CreateClaseDto.escuela,CreateClaseDto.estudianteClase));
    if(clase)
     return true
    else
     throw new Error('No se pudo crear la nueva clase');
  }

  async findAll():Promise<Clase[]> {
    return await this.claseRepository.find({relations:['estudiantes']});
  }

  async findOne(id: number):Promise<Clase> {
    const criterio: FindOneOptions = {where: {id:id}}
    let clase : Clase = await this.claseRepository.findOne(criterio);
    if(clase)
     return clase;
    else 
     throw new Error('No se encuentra la clase');     
  }

  async update(id: number, CreateClaseDto:CreateClaseDto):Promise<string> {
    const criterio : FindOneOptions = {where: {id:id}};
    let clase: Clase = await this.claseRepository.findOne(criterio);
    let claseVieja = { 
      nombre: clase.getNombre(),
      profesor: clase.getProfesor(),
      escuela: clase.getEscuela(),
      estudianteClase: clase.getEstudianteClase() };
    if(clase){
     clase.setNombre(CreateClaseDto.nombre);
     clase.setProfesor(CreateClaseDto.profesor);
     clase.setEscuela(CreateClaseDto.escuela);
     clase.setEstudianteClase(CreateClaseDto.estudianteClase);
     
     clase = await this.claseRepository.save(clase);
    return `Se reemplazo: ${claseVieja} --> ${clase.getNombre()},${clase.getEscuela},${clase.getProfesor},${clase.getEstudianteClase}`
    } else{
       return 'No se pudo reemplazar';
      }
    
    }

  async delete(id: number):Promise<boolean> {
    try{
      const criterio : FindOneOptions = {where: {id:id}};
      const clase: Clase = await this.claseRepository.findOne(criterio);
    if(clase){
     await this.claseRepository.remove(clase);
     return true;
    }else
      throw new Error('No se encontro clase para eliminar')
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase -- ' + error
      },HttpStatus.NOT_FOUND)
    }
  }
}