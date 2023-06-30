import { EntityRepository, Repository } from 'typeorm';
import { Paciente } from '../typeorm/entities/Patient';

@EntityRepository(Paciente)
export class PacienteRepository extends Repository<Paciente> {
  // Add any custom methods for the Paciente entity here
}