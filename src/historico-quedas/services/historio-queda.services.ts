import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricoQuedaRepository } from '../historicoQueda.repository';
import { HistoricoQueda } from '../../typeorm/entities/HistoricoQuedas';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { CreateHistoricoQuedaDto } from '../dtos/Create-historicoQueda.dto';
import { UpdateHistoricoQuedaDto } from '../dtos/Update-historicoQueda.dto';

@Injectable()
export class HistoricoQuedaService {
  constructor(
    @InjectRepository(HistoricoQuedaRepository)
    private historicoQuedaRepository: HistoricoQuedaRepository,
  ) {}

  // Add any custom methods for the HistoricoQueda entity here

  async getHistoricoQuedasByPatient(patientId: number): Promise<HistoricoQueda[]> {
    return await this.historicoQuedaRepository
      .createQueryBuilder('historicoQueda')
      .innerJoin('historicoQueda.paciente', 'paciente')
      .where('paciente.id = :patientId', { patientId })
      .orderBy('historicoQueda.data', 'DESC')
      .getMany();
  }

  async getFallsByMonth(patientId: number, month: number): Promise<{ labels: number[]; data: number[] }> {
    const startDate = new Date();
    startDate.setMonth(month - 1);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMonth(month);
    endDate.setDate(0);
    endDate.setHours(23, 59, 59, 999);

    const fallsData = await this.historicoQuedaRepository.createQueryBuilder('historico_quedas')
        .select('DAY(historico_quedas.data)', 'day')
        .addSelect('COUNT(historico_quedas.id)', 'count')
        .where('historico_quedas.patientId = :patientId', { patientId })
        .andWhere('historico_quedas.data >= :startDate', { startDate })
        .andWhere('historico_quedas.data <= :endDate', { endDate })
        .groupBy('DAY(historico_quedas.data)')
        .getRawMany();

    const labels = Array.from({ length: endDate.getDate() }, (_, i) => i + 1);
    const data = labels.map(day => {
        const fallRecord = fallsData.find(record => record.day === day);
        return fallRecord ? fallRecord.count : 0;
    });

    return { labels, data };
}

async createHistoricoQueda(dto: CreateHistoricoQuedaDto): Promise<HistoricoQueda> {
    const newHistoricoQueda = this.historicoQuedaRepository.create(dto);
    return await this.historicoQuedaRepository.save(newHistoricoQueda);
  }

  async updateHistoricoQueda(id: number, dto: UpdateHistoricoQuedaDto): Promise<HistoricoQueda> {
    await this.historicoQuedaRepository.update(id, dto);
    return await this.historicoQuedaRepository.findOne({ where: { id: id } });
  }
}