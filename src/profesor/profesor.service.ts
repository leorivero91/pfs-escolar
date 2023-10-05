import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {
  findAll(): CreateProfesorDto | PromiseLike<CreateProfesorDto> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<CreateProfesorDto> {
    throw new Error('Method not implemented.');
  }
  private profesores: Profesor [] = [];

  constructor(@InjectRepository(Profesor)
               private readonly profesorRepository: Repository<Profesor>,
               @InjectRepository(Ciudad)
               private readonly ciudadRepository: Repository<Ciudad>,
               @InjectRepository(CiudadProfesor)
               private readonly ciudadProfesorRepository: Repository<CiudadProfesor>
            ) {}
  
  async findAllRaw():Promise<Profesor []>{
    let profesores = await this.profesorRepository.query("SELECT * from profesores");

    profesores.forEach(element => {
      let profesor: Profesor = new Profesor[(element.nombre,element.apellido,element.domicilio)];
      this.profesores.push(profesor)
    });

    return this.profesores;

  }

  async findById(id: number): Promise<CreateProfesorDto >{
    try{
      const criterio: FindOneOptions = {where : {id:id}};
      const profesor : Profesor = await this.profesorRepository.findOne(criterio);
      if(profesor){
        const createProfesorDto:CreateProfesorDto = {
          nombre :profesor.getNombre(),
          apellido : profesor.getApellido(),
          domicilio : profesor.getDomicilios(),
          clases : profesor.getClase()
        }
        return createProfesorDto;
      }else{
        throw new Error('No se encuentra el profesor');
      }
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en find by Id -- ' + error
      },HttpStatus.NOT_FOUND)

    }
  }
  
  async createDomicilio(body){
    const { ciudadId, profesorId, domicilio } = body;

    const profesor = await this.profesorRepository.findOne({ where: {id: profesorId}})
    if(!profesor)
      return 'error - no existe este profesor'

    const ciudad = await this.ciudadRepository.findOne({where:{id:ciudadId}})
    if(!ciudad)
      return 'error - no existe la ciudad para este profesor '

    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({where : {profesorId: profesorId, ciudadId:ciudadId}})
    if(nuevo_domicilio)
      return 'ya tiene domicilio'
    return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId,profesorId,domicilio))
    }


  async create(createProfesorDto: CreateProfesorDto):Promise<boolean> {
    try{
      let profesor: Profesor = await this.profesorRepository.save(new Profesor(createProfesorDto.nombre, createProfesorDto.apellido,createProfesorDto.domicilio));
    if(profesor)
     return true;
    else 
     throw new Error('No se pudo crear el nuevo profesor');
  } catch(error){
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'Problemas en create profesor -- ' + error
    },HttpStatus.NOT_FOUND)
  }
}

async update(createProfesorDto:CreateProfesorDto,id: number):Promise<string> {
  try{
    const criterio: FindOneOptions = {where: {id:id}}
  
    let profesor : Profesor = await this.profesorRepository.findOne(criterio);
    let profesorViejo = {
      nombre: profesor.getNombre(),
      apellido : profesor.getApellido(),
      domicilio: profesor.getDomicilios(),
      clase : profesor.getClase()
    };
    if(profesor){
      profesor.setNombre(createProfesorDto.nombre),
      profesor.setApellido(createProfesorDto.apellido),
      profesor.setDomicilios(createProfesorDto.domicilio),
      profesor.setClase(createProfesorDto.clases);
    profesor = await this.profesorRepository.save(profesor);
    return `Se reemplazo: ${profesorViejo} --> ${profesor.getNombre()},${profesor.getApellido},${profesor.getDomicilios},${profesor.getClase} `
    } else{
      return 'No se pudo reemplazar ';
    }
  }catch(error){
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: ' Error en profesor update - ' + error
    }, HttpStatus.NOT_FOUND)
   }
}

  async delete(id: number):Promise<any> {
    try{
      const criterio: FindOneOptions = { where: {id:id}};
      let profesor: Profesor = await this.profesorRepository.findOne(criterio);
      if(!profesor){
       throw new Error('No se pudo eliminar el profesor');
      } else{
        await this.profesorRepository.remove(profesor);
        return {id:id,
               message: 'se elimino exitosamente el profesor'}
      }
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: ' Error en profesor delete - ' + error
      }, HttpStatus.NOT_FOUND)
    }
  }
}
