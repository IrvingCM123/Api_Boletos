import { Test, TestingModule } from '@nestjs/testing';
import { InformacionCompañiaService } from './informacion_compañia.service';

describe('InformacionCompañiaService', () => {
  let service: InformacionCompañiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformacionCompañiaService],
    }).compile();

    service = module.get<InformacionCompañiaService>(InformacionCompañiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
