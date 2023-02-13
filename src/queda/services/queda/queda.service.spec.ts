import { Test, TestingModule } from '@nestjs/testing';
import { QuedaService } from './queda.service';

describe('QuedaService', () => {
  let service: QuedaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuedaService],
    }).compile();

    service = module.get<QuedaService>(QuedaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
