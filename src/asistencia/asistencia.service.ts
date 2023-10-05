import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/estudiante_clase.entity';

@Injectable()
export class AsistenciaService {

  private asistencia : Asistencia[] = [] ;

  constructor(@InjectRepository(Asistencia)
              private readonly asistenciaRepository:Repository<Asistencia>,
              @InjectRepository(EstudianteClase)
              private readonly estudianteClaseRepository: Repository<EstudianteClase> ){}
              
  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const { estudianteId, claseId, fecha} = createAsistenciaDto;
    const asistencia_estudiante = await this.estudianteClaseRepository.findOne({where: {estudianteId:estudianteId,claseId:claseId}})
      if(!asistencia_estudiante)
      return 'error - no existe estudiante/clase'
    return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId,fecha))
  }            
  
  async getAllRaw() : Promise<Asistencia[]> {
   let datos = await this.asistenciaRepository.query("SELECT * FROM asistencia");
      datos.forEach(element => {
        let asistencia : Asistencia = new Asistencia(element.claseId, element.estudianteId, element.fecha);
        this.asistencia.push(asistencia);
      });
       return this.asistencia; 
  }     

  async findAllOrm():Promise<Asistencia[]>{
    return await this.asistenciaRepository.find();
  }

  async findOneById(claseId: number, estudianteId:number): Promise<Asistencia>{
    try {const criterio: FindOneOptions = {where: {
      claseId:claseId, 
      estudianteId:estudianteId}}
    let asistencia: Asistencia = await this.asistenciaRepository.findOne(criterio);
    if(asistencia)
      return asistencia
    else
      throw new Error('No se encuentra asistencia ');
  } 
  catch (error){
    throw new HttpException({ 
      status: HttpStatus.CONFLICT,
      error: ' Error en asistencia - ' + error
    }, HttpStatus.NOT_FOUND)
  }
 }
 
 async update(createAsistenciaDto:CreateAsistenciaDto, claseId:number, estudianteId:number): Promise<string>{
  try{
    const criterio : FindOneOptions = {where: {
    claseId:claseId,
    estudianteId: estudianteId }};
    let asistencia: Asistencia = await this.asistenciaRepository.findOne(criterio);
    let asistenciaVieja = {
      fecha: asistencia.getFecha(),
      claseId: asistencia.getClaseId(),
      estudianteId: asistencia.getEstudianteId() };
    if(asistencia){
      asistencia.setFecha(createAsistenciaDto.fecha);
      asistencia.setClaseId(createAsistenciaDto.claseId);
      asistencia.setEstudianteId(createAsistenciaDto.estudianteId);
      
      asistencia = await this.asistenciaRepository.save(asistencia);
     return ` Se actualizo ${asistenciaVieja} por --> ${createAsistenciaDto.fecha}, ${createAsistenciaDto.claseId}, ${createAsistenciaDto.estudianteId} `;
      }  throw new Error ('No se encuentra la asistencia a modificar');   
  }
  catch(error){
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'Error en update_asistencia - '+ error
    }, HttpStatus.NOT_FOUND)
  }
}

  async delete(claseId:number, estudianteId:number): Promise<any>{
    try{
      const criterio : FindOneOptions = { where: {
        claseId:claseId,
        estudianteId: estudianteId }};
      const asistencia : Asistencia = await this.asistenciaRepository.findOne(criterio);
      if (asistencia){
        await this.asistenciaRepository.remove(asistencia);
        return { message: 'Se elimino correctamente la asistencia'}
      } else {
        throw new Error ('No se ha podido eliminar la asistencia');
      } 
    }catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Error en delete asistencia - '+ error
      }, HttpStatus.NOT_FOUND)
    }
  }
  





















}






  

  



  
  
