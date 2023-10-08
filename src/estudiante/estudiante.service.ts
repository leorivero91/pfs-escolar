import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteClase } from './entities/estudiante_clase.entity';
import { Clase } from 'src/clase/entities/clase.entity';

@Injectable()
export class EstudianteService {

  private estudiantes: Estudiante [] = [];

  constructor(@InjectRepository(Estudiante)
              private estudianteRepository:Repository<Estudiante>,
              @InjectRepository(Clase)
              private claseRepository:Repository<Clase>,
              @InjectRepository(EstudianteClase)
              private estudianteClaseRepository:Repository<EstudianteClase>)
              {}


  async findAllRaw(): Promise<EstudianteDto>{
   
    const datos = await this.estudianteRepository.query("SELECT * from estudiantes ");

    datos.forEach(element => {
       let estudiante: Estudiante = new Estudiante[element['nombre']['apellido']['fecha_nacimiento']['estudianteClase']];       this.estudiantes.push(estudiante)
    });

    return this.estudiantes;

  }

  async create(EstudianteDto: EstudianteDto): Promise<boolean>{
  try{
   let estudiante: Estudiante = await this.estudianteRepository.save(new Estudiante(EstudianteDto.nombre,EstudianteDto.apellido,EstudianteDto.fecha_nacimiento))
    if(estudiante)
    return true;
    else 
      throw new Error( ' No se creo el estudiante')
  }catch(error){
    throw new HttpException({
      status: HttpStatus.CONFLICT,
      error: 'Error en create estudiante - ' + error
  },HttpStatus.NOT_FOUND)
  }  }


  async addClase(body): Promise<any>{
    const {claseId, estudianteId} = body;
    const estudiante= await this.estudianteRepository.findOne({where : {id:estudianteId}})
    if(!estudiante)
     return 'error - no se encontro el estudiante con id ${estudianteId}'
    const clase = await this.claseRepository.findOne({where : {id: claseId}})
    if(!clase)
      return 'error - no se encontro la clase '
    const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}})
    if(clase_estudiante)
      return ' error - el estudiante ya tiene asignada esa clase' ;
    return await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId));
    }

  async findById(id :number) : Promise<EstudianteDto> {
    try{
      const criterio : FindOneOptions = { where: { id:id} };
      const estudiante : Estudiante  = await this.estudianteRepository.findOne( criterio );
      if (estudiante) {
        const EstudianteDto: EstudianteDto = {
         nombre: estudiante.getNombre(), 
         apellido: estudiante.getApellido(),
         fecha_nacimiento: estudiante.getFechaNacimiento(),
         estudianteClase: estudiante.getEstudianteClase(),
          };
          return EstudianteDto;
      } else {
          throw new Error('No se encuentra el estudiante');
        }
      }catch(error){
          throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: 'Error en estudiante findbyid - ' + error
          },HttpStatus.NOT_FOUND)
      }
    }

    async update(EstudianteDto:EstudianteDto, id:number ): Promise<string>{
      try{
        const criterio: FindOneOptions = {where: {id:id}}

        let estudiante: Estudiante = await this.estudianteRepository.findOne(criterio);
        let estudianteViejo = {
          nombre: estudiante.getNombre(), 
          apellido: estudiante.getApellido(),
          fecha_nacimiento: estudiante.getFechaNacimiento(),
          estudianteClase: estudiante.getEstudianteClase() };
        if(estudiante){
          estudiante.setNombre(EstudianteDto.nombre),
          estudiante.setApellido(EstudianteDto.apellido),
          estudiante.setFechaNacimiento(EstudianteDto.fecha_nacimiento),
          estudiante.setEstudianteClase(EstudianteDto.estudianteClase);
          
          estudiante = await this.estudianteRepository.save(estudiante);
          return `Se reemplazo al : ${estudianteViejo} --> por ${estudiante.getNombre},${estudiante.getApellido}, ${estudiante.getFechaNacimiento}, ${estudiante.getEstudianteClase} `;
        }else {
          return 'No se pudo reemplazar';    }
      }catch(error){
          throw new HttpException({
              status: HttpStatus.CONFLICT,
              error: 'Error en estudiante update - ' + error
          },HttpStatus.NOT_FOUND)
    }
  }

  async delete(id: number){
    try{
      const criterio: FindOneOptions = { where: {id:id} };
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);
      if(!estudiante)
       throw new Error('No se pudo eliminar el estudiante ') 
      else { 
        await this.estudianteRepository.remove(estudiante);
        return { id:id,
              message: ' se elimino correctamente la escuela'};
      }
    } catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: ' Error en estudiante delete - ' + error
      }, HttpStatus.NOT_FOUND)
    }
   }
  }
}