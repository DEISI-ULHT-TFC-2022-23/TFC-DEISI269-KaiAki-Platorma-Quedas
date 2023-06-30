import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Paciente } from '../../typeorm/entities/Patient';
import { Queda } from '../../typeorm/entities/Queda';
import { HistoricoQueda } from '../../typeorm/entities/HistoricoQuedas';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Paciente)
    private patientsRepository: Repository<Paciente>,
    @InjectRepository(Queda)
    private quedaRepository: Repository<Queda>,
    @InjectRepository(HistoricoQueda)
    private historicoQuedaRepository: Repository<HistoricoQueda>,
  ) {}

  async getDataForMonth(month: string) {
    // Parse the month string into a Date object
    const date = new Date(month);

    // Get the start and end dates for the month
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Query the repositories to get the patients for the month
    const patients = await this.patientsRepository.find({
      where: {
        data_criacao: Between(startDate, endDate),
      },
      relations: ['quedas'],
    });

    // Format the data as needed
    const data = patients.map((paciente) => {
      const temperatureData = {
        labels: [],
        data: [],
      };
      const fallData = {
        labels: [],
        data: [],
      };

      paciente.quedas.forEach((queda) => {
        const day = queda.date.getDate();
        temperatureData.labels.push(day.toString());
        temperatureData.data.push(queda.temperatura_corporal);

        fallData.labels.push(day.toString());
        fallData.data.push(queda.posicao === 'fell' ? 1 : 0);
      });

      return {
        patient: paciente.primeiro_nome,
        temperature: temperatureData,
        fall: fallData,
      };
    });

    return data;
  }
}