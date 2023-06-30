import { Controller } from '@nestjs/common';
import { PacienteService } from '../services/patient.service';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Paciente } from 'src/typeorm/entities/Patient';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/Update-paciente.dto';

@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}
  
    // Route to fetch all Pacientes
    @Get()
    getAllPacientes(): Promise<Paciente[]> {
      return this.pacienteService.getAllPacientes();
    }
  
    // Route to create a new Paciente
    @Post()
    createPaciente(@Body() createPacienteDto: CreatePacienteDto): Promise<Paciente> {
      return this.pacienteService.createPaciente(createPacienteDto);
    }
  
    // Route to update a Paciente's information
    @Put(':id')
    updatePaciente(
      @Param('id') id: number,
      @Body() updatePacienteDto: UpdatePacienteDto,
    ): Promise<Paciente> {
      return this.pacienteService.updatePaciente(id, updatePacienteDto);
    }
  
    // Route to delete a Paciente
    @Delete(':id')
    deletePaciente(@Param('id') id: number): Promise<void> {
      return this.pacienteService.deletePaciente(id);
    }
  }