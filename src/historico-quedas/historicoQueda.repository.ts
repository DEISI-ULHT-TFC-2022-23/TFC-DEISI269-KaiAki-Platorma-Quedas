import { EntityRepository, Repository } from 'typeorm';
import { HistoricoQueda } from '../typeorm/entities/HistoricoQuedas';

@EntityRepository(HistoricoQueda)
export class HistoricoQuedaRepository extends Repository<HistoricoQueda> {

  async getHistoricoQuedasByPatient(patientId: number): Promise<HistoricoQueda[]> {
    return await this.createQueryBuilder('historicoQueda')
      .innerJoin('historicoQueda.paciente', 'paciente')
      .where('paciente.id = :patientId', { patientId })
      .orderBy('historicoQueda.data', 'DESC')
      .getMany();
  }

  async getFallsByMonth(patientId: number, month: number): Promise<any[]> {
    const startDate = new Date();
    startDate.setMonth(month - 1);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(month);
    endDate.setDate(0);
    endDate.setHours(23, 59, 59, 999);

    return await this.createQueryBuilder('historico_quedas')
      .select('DAY(historico_quedas.data)', 'day')
      .addSelect('COUNT(historico_quedas.id)', 'count')
      .where('historico_quedas.patientId = :patientId', { patientId })
      .andWhere('historico_quedas.data >= :startDate', { startDate })
      .andWhere('historico_quedas.data <= :endDate', { endDate })
      .groupBy('DAY(historico_quedas.data)')
      .getRawMany();
  }
}