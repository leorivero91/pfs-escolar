import { Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    this.estudiantes = [] ;
    let datos = await this.estudianteRepository.query("SELECT * from estudiantes ");

    datos.forEach(element => {
       let estudiante: Estudiante = new Estudiante[(element.nombre,element.apellido,element.fecha_nacimiento,element.estudianteClase)]
       this.estudiantes.push(estudiante)
    });

    return this.estudiantes;

  }

  async create(EstudianteDto: EstudianteDto) {
    // const fecha = new Date()
    const estudiante: Estudiante = await this.estudianteRepository.save(estudiante)
    if(estudiante)
      return `Se creo el estudiante ${estudiante.nombre}`;
    else
     return 'no se creo el estudiante';  
  }

async createConRelacion( estudianteDto:EstudianteDto ):Promise<boolean> {
  let estudiante: Estudiante= new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fecha_nacimiento);
  const clase:Clase[] = await this.claseRepository.find();
  if(clase)
   estudiante.clases= clase;
  await this.estudianteRepository.save(estudiante);
  if(estudiante)
    return true;
  return false
}
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

  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, EstudianteDto: EstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
