import { EntityRepository, Repository } from 'typeorm';
import { Queda } from '../typeorm/entities/Queda';

@EntityRepository(Queda)
export class QuedaRepository extends Repository<Queda> {
  // Add any custom methods for the Queda entity here
}