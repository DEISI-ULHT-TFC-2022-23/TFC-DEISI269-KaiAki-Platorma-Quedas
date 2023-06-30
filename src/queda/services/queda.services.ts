import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Queda } from '../../typeorm/entities/Queda';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsGateway, EventsService } from 'src/socket/events.gateway';

@Injectable()
export class QuedaService {
  constructor(
    @InjectRepository(Queda)
    private quedaRepository: Repository<Queda>,
  
    private eventsService: EventsService,
  ) {}

  async create(queda: Queda): Promise<Queda> {
    const savedQueda = await this.quedaRepository.save(queda);
  // Check if savedQueda can be serialized to JSON
  try {
    JSON.stringify(savedQueda);
} catch (error) {
    console.error('Failed to serialize savedQueda:', error);
}

console.log('savedQueda:', savedQueda);
    // Emit the new Queda to all connected clients
    console.log('Before emitting event');
    this.eventsService.emit('newQueda', savedQueda);

    return savedQueda;
  }


  async getQuedas(): Promise<Queda[]> {
    return await this.quedaRepository.find();
  }

  async getQuedasDataByPatient(patientId: number): Promise<Queda[]> {
    return await this.quedaRepository.find({
      where: { paciente: { id: patientId } },
      order: { date: 'DESC' },
    });
  }

  async getHistoricalTemperatureAndPosition(patientId: number): Promise<Queda[]> {
    return await this.quedaRepository.find({
      where: { paciente: { id: patientId } },
      order: { date: 'DESC' },
    });
  }
}