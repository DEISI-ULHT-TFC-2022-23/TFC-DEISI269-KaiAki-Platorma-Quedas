import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteRepository } from '../paciente.repository';
import { Paciente } from '../../typeorm/entities/Patient';
import { UpdatePacienteDto } from '../dtos/Update-paciente.dto';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';

@Injectable()
export class PacienteService {
  // Inject the PacienteRepository into the service
  constructor(
    @InjectRepository(PacienteRepository)
    private readonly pacienteRepository: PacienteRepository,
  ) {}

  // Other methods ...
  
  // Method to get all Pacientes
  async getAllPacientes(): Promise<Paciente[]> {
    return await this.pacienteRepository.find();
  }

  // Add a method to create a new Paciente
  async createPaciente(pacienteData: CreatePacienteDto): Promise<Paciente> {
    const paciente = this.pacienteRepository.create(pacienteData);
    await this.pacienteRepository.save(paciente);
    return paciente;
  }

  // Add a method to update a Paciente
  async updatePaciente(id: number, updatePacienteDto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({ where: { id: id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente with ID ${id} not found`);
    }
    Object.assign(paciente, updatePacienteDto);
    await this.pacienteRepository.save(paciente);
    return paciente;
  }

  // Add a method to delete a Paciente
  async deletePaciente(id: number): Promise<void> {
    const result = await this.pacienteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Paciente with ID ${id} not found`);
    }
  }
}







