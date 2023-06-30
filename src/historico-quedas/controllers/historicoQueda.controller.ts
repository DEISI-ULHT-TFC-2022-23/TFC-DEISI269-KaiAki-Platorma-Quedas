import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { HistoricoQuedaService } from '../services/historio-queda.services';
import { HistoricoQueda } from 'src/typeorm/entities/HistoricoQuedas';
import { CreateHistoricoQuedaDto } from '../dtos/Create-historicoQueda.dto';
import { UpdateHistoricoQuedaDto } from '../dtos/Update-historicoQueda.dto';

@Controller('historico-queda')
export class HistoricoQuedaController {
  constructor(
    private readonly historicoQuedaService: HistoricoQuedaService,
  ) {}

  // Add your routes and methods for the HistoricoQueda entity here

  @Get('/paciente/:patientId')
    async getHistoricoQuedasByPatient(@Param('patientId', ParseIntPipe) patientId: number): Promise<HistoricoQueda[]> {
    return this.historicoQuedaService.getHistoricoQuedasByPatient(patientId);
}

@Get('falls')
  async getFallsByMonth(
    @Query('month') month: number,
    @Query('patientId') patientId: number,
  ): Promise<any> {
    const data = await this.historicoQuedaService.getFallsByMonth(patientId, month);
    return { labels: data.labels, data: data.data };
  }

  @Post()
  async createHistoricoQueda(@Body() dto: CreateHistoricoQuedaDto): Promise<HistoricoQueda> {
    return this.historicoQuedaService.createHistoricoQueda(dto);
  }

  @Put(':id')
  async updateHistoricoQueda(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHistoricoQuedaDto,
  ): Promise<HistoricoQueda> {
    return this.historicoQuedaService.updateHistoricoQueda(id, dto);
  }

  @Get()
  getHistoricalData(@Query('month') month: number): any[] {
    // Busque os dados históricos com base no mês fornecido e retorne-os.
    // Esta é apenas uma implementação de exemplo e deve ser ajustada de acordo com a fonte de dados real.
    const historicalData = [
      // Dados fictícios
    ];

    return historicalData.filter((data) => new Date(data.timestamp).getMonth() + 1 === month);
  }
}

