import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/typeorm/entities/Patient';
import { CreatePatientParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {

constructor(@InjectRepository(Patient) private patientRepository: Repository<Patient>,){

}


 createPatient(patientDetails : CreatePatientParams){

    const newPatient= this.patientRepository.create({...patientDetails, createdAt: new Date()});

   return this.patientRepository.save(newPatient);






 }


 findPatientById( id: number){




     const patient = this.patientRepository.findOneBy({ id });

     return patient;


 }


 


}
