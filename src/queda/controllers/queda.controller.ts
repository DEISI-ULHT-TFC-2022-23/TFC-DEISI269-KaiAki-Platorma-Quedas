import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuedaService } from '../services/queda.services';
import { Queda } from 'src/typeorm/entities/queda';

@Controller('queda')
export class QuedaController {
  constructor(private readonly quedaService: QuedaService) {}

  // Add your routes and methods for the Queda entity here

  @Get('')
    async getQuedas() {
    return this.quedaService.getQuedas();

}



@Get('/paciente/:patientId')
    async getQuedasDataByPatient(@Param('patientId', ParseIntPipe) patientId: number): Promise<Queda[]> {
    return this.quedaService.getQuedasDataByPatient(patientId);

}


@Get('/historical/:patientId')
async getHistoricalTemperatureAndPosition(
  @Param('patientId', ParseIntPipe) patientId: number,
): Promise<Queda[]> {
  return this.quedaService.getHistoricalTemperatureAndPosition(patientId);
}
}