import { Test, TestingModule } from '@nestjs/testing';
import { HistoricoQuedaService } from './historico-queda.service';

describe('HistoricoQuedaService', () => {
  let service: HistoricoQuedaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricoQuedaService],
    }).compile();

    service = module.get<HistoricoQuedaService>(HistoricoQuedaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
