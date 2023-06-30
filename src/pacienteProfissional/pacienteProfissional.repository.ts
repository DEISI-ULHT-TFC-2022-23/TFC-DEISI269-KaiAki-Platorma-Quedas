import { EntityRepository, Repository } from 'typeorm';
import { PacienteProfissional } from '../typeorm/entities/pacienteProfissional.entity';

@EntityRepository(PacienteProfissional)
export class PacienteProfissionalRepository extends Repository<PacienteProfissional> {
  // Add any custom methods for the PacienteProfissional entity here
}