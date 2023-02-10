import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPatientDto } from 'src/patients/dtos/CreatePatient.dto';
import { PatientsService } from 'src/patients/services/patients/patients.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('patients')
export class PatientsController {

    constructor(private  patientService: PatientsService ){

    }


@Get()
getPatients() {



}

@Post()
createPatient( @Body() createPatientDto : createPatientDto){
 
    
    this.patientService.createPatient(createPatientDto);
}











}
